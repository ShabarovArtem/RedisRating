import { Table, Column, Model } from 'sequelize-typescript';

interface RatingCreationAttrs {
    rate: number;
}

@Table({ updatedAt: false })
export class Rating extends Model<Rating, RatingCreationAttrs> {
    @Column({ allowNull: false })
    rate!: number;

}

export default Rating;
