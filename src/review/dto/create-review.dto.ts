import { IsString, IsNumber, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Max(5, { message: 'Рейтинг должен быть от 1 до 5' })
  @Min(1, { message: 'Рейтинг должен быть от 1 до 5' })
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;
}
