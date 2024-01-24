import mongoose from 'mongoose';

export const loadDatabase = () => mongoose.connect('mongodb://root:password@0.0.0.0:27017/miit');
