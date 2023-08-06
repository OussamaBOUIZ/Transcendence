import { Injectable, Scope, Inject, Request } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request as ExpressRequest } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class RequestProvider {
  constructor(@Inject(REQUEST) private readonly request: ExpressRequest) {}

  getRequest(): ExpressRequest {
    return this.request;
  }
}