import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGODB_URL:process.env.MONGODB_URL || 'MONGODB_URL',
    PORT: process.env.PORT || 3100,
}