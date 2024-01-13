import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const {
      name,
      dateOfBirth,
      email,
      gender,
      userId,
      password,
      passwordConfirm,
    } = createUserDto;

    if (password !== passwordConfirm) {
      throw new BadRequestException(`비밀번호와 비밀번호 확인이 다릅니다.`);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.userRepository.create({
      name,
      email,
      gender,
      userId,
      dateOfBirth,
    });

    try {
      const createdUser = await this.userRepository.save(newUser);
      const { id, name, userId } = createdUser;
      const createdUserAuth = this.authRepository.create({
        id,
        name,
        userId,
        password: hashedPassword,
      });
      await this.authRepository.save(createdUserAuth);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return newUser;
  }

  async signIn(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { userId, password } = loginUserDto;
    const user = await this.authRepository.findOne({ where: { userId } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { userId };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Login Failed');
    }
  }
}
