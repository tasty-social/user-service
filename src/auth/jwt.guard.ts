import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { PUBLIC_META_KEY } from 'src/common/decorator/public.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAll<string[]>(PUBLIC_META_KEY, [context.getHandler(), context.getClass()])

    if (isPublic) {
      return true
    }
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}
