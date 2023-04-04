import {Request} from 'express';

export interface MyRequest extends Request {
    user_id?: any 
}