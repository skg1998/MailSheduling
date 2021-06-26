import {
  Controller,
  Route,
  Tags,
  Body,
  Post,
  Get,
  Security,
  Request,
} from 'tsoa';
import { MailService } from '../services';
import { IMail, IMailDocument, ISentMailDocument, MailModel, SentMailModel } from '../models';

@Tags('Mail')
@Route('/mail')
export class MailController extends Controller {
  private mailService: MailService;
  constructor() {
    super();
    this.mailService = new MailService();
  }

  @Security('auth')
  @Post('/')
  public async createMail(
    @Body() mail: IMail,
    @Request() req: any
  ): Promise<ISentMailDocument> {
    mail.createdBy = req.user.user._id;
    return this.mailService.createMail(mail);
  }

  @Security('auth')
  @Get('/sent')
  public async sentMails(
    @Request() req: any
  ) {
    return SentMailModel.find({
      'mail.createdBy': req.user.user._id
    })
  }

  @Security('auth')
  @Get('/scheduled')
  public async scheduledMails(
    @Request() req: any
  ) {
    return MailModel.find({
      createdBy: req.user.user._id
    })
  }
} 
