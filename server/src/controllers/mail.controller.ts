import {
  Controller,
  Route,
  Tags,
  Res,
  TsoaResponse,
  Body,
  Post,
  Get,
} from 'tsoa';
import { MailService } from '../services';
import { IMail, MailModel } from '../models';

@Tags('Mail')
@Route('/mail')
export class MailController extends Controller {
  private mailService: MailService;
  constructor() {
    super();
    this.mailService = new MailService();
  }

  @Post('/createMail')
  public async createMail(
    @Body() mail: IMail,
    @Res() badRequest: TsoaResponse<400, { message: string }>
  ) {}

  @Get('/sendMail')
  public async sendMail(
    @Res() badRequest: TsoaResponse<400, { message: string }>
  ) {}

  @Get('/getSchedulerMail')
  public async getListSchedulerMail(
    @Res() badRequest: TsoaResponse<400, { message: string }>
  ) {}

  @Get('/getAllSendedMail')
  public async getAllSendedMail(
    @Res() badRequest: TsoaResponse<400, { message: string }>
  ) {}
}
