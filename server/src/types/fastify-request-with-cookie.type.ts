import { FastifyRequestType } from 'fastify/types/type-provider';

export interface FastifyRequestTypeWithCookie extends FastifyRequestType {
  cookies: any;
  setCookie: (key: string, value: string, options: any) => void;
}
