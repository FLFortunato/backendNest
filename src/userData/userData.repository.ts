import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDataDto } from './dto/createUserData.dto';
import { UserData } from './entities/userData.entity';

@EntityRepository(UserData)
export class UserDataRepository extends Repository<UserData> {
  async createUserData(data: CreateUserDataDto): Promise<any> {
    const {
      street,
      neighborhood,
      number,
      cellphone,
      city,
      complement,
      phone,
      zipcode,
      country,
      state,
    } = data;

    try {
      const result = await this.create({
        street,
        neighborhood,
        number,
        cellphone,
        city,
        complement,
        phone,
        zipcode,
        country,
        state,
      });

      result.save();

      return result;
    } catch (error) {}
  }
}
