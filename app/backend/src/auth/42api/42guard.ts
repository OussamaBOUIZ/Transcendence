import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class FortyTwoGuard extends AuthGuard('42') {
    
}