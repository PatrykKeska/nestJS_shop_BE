import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export = {
  transport: `smtp://admin:admin@localhost:2500`,
  defaults: {
    from: `admin@test.com`,
  },
  template: {
    dir: __dirname + '/templates/email',
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
};
