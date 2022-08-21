import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalHelpers {
  isEmail(str: string) {
    const pattern = '^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$';

    return 'heyyo';
  }
}
