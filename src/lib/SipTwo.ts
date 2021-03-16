import { Connection } from './Connection';
import { CommonRequestDto, MessageGuard, Sequence } from './decorators';
import { Language } from './variables';
import {
  IACStatusResponse,
  IBlockPatronRequestDto,
  ICheckinRequestDto,
  ICheckinResponse,
  ICheckoutRequestDto,
  ICheckoutResponse,
  ICommonRequestDto,
  IEndPatronSessionResponse,
  IFeePaidRequestDto,
  IFeePaidResponse,
  IHoldRequestDto,
  IHoldResponse,
  IItemInformationResponse,
  ILoginResponse,
  IPatronCredentials,
  IPatronEnableResponse,
  IPatronInformationResponse,
  IPatronStatusResponse,
  IRenewAllRequestDto,
  IRenewAllResponse,
  IRenewRequestDto,
  IRenewResponse,
  ISCStatusRequestDto,
  ISip2ConnectionOptions,
} from './interfaces';
import {
  BlockPatronRequest,
  CheckInRequest,
  CheckoutRequest,
  EndPatronSessionRequest,
  FeePaidRequest,
  HoldRequest,
  ItemInformationRequest,
  LoginRequest,
  PatronEnableRequest,
  PatronInformationRequest,
  PatronStatusRequest,
  RenewAllRequest,
  RenewRequest,
  ResendRequest,
  SCStatusRequest,
} from './requests';

export class SipTwo {
  public connection: Connection;
  private authenticated = false;
  private scStatus: IACStatusResponse;
  private patronCredentials: IPatronCredentials;
  @Sequence() private sequence: number;
  @CommonRequestDto() private commonRequestDto: ICommonRequestDto;

  constructor(private sip2ConnectionOptions: ISip2ConnectionOptions) {
    if (!sip2ConnectionOptions.port) sip2ConnectionOptions.port = 6001;
    if (!sip2ConnectionOptions.timeout) sip2ConnectionOptions.timeout = 5000;
    if (!sip2ConnectionOptions.language || !Language[sip2ConnectionOptions.language]) {
      sip2ConnectionOptions.language = '001';
    }

    this.connection = new Connection(sip2ConnectionOptions);
  }

  public setPatron(patronCredentials: IPatronCredentials) {
    this.patronCredentials = patronCredentials;
  }

  public async login(): Promise<ILoginResponse> {
    const loginRequest = new LoginRequest(this.commonRequestDto);
    const loginResponse: ILoginResponse = await this.connection.send(loginRequest.getMessage());

    if (!loginResponse.ok) {
      throw new Error('Invalid credentials');
    }

    this.authenticated = true;
    this.scStatus = await this.requestSCStatus();
    return loginResponse;
  }

  public async requestResend(): Promise<any> {
    const resendRequest = new ResendRequest();
    return await this.connection.send(resendRequest.getMessage());
  }

  @MessageGuard()
  public async requestSCStatus(scStatusRequestDto: ISCStatusRequestDto = {}): Promise<IACStatusResponse> {
    const scStatusRequest = new SCStatusRequest(this.commonRequestDto, scStatusRequestDto);
    return await this.connection.send(scStatusRequest.getMessage());
  }

  @MessageGuard('patronEnable')
  public async requestPatronEnable(): Promise<IPatronEnableResponse> {
    const patronEnableRequest = new PatronEnableRequest(this.commonRequestDto);
    return await this.connection.send(patronEnableRequest.getMessage());
  }

  @MessageGuard('blockPatron')
  public async requestPatronBlock(
    blockPatronRequestDto: IBlockPatronRequestDto,
  ): Promise<IPatronStatusResponse> {
    const blockPatronRequest = new BlockPatronRequest(this.commonRequestDto, blockPatronRequestDto);
    return await this.connection.send(blockPatronRequest.getMessage());
  }

  @MessageGuard('patronInformation')
  public async requestPatronInformation(): Promise<IPatronInformationResponse> {
    const patronInformationRequest = new PatronInformationRequest(this.commonRequestDto);
    return await this.connection.send(patronInformationRequest.getMessage());
  }

  @MessageGuard('patronStatusRequest')
  public async requestPatronStatus(): Promise<IPatronStatusResponse> {
    const patronStatusRequest = new PatronStatusRequest(this.commonRequestDto);
    return await this.connection.send(patronStatusRequest.getMessage());
  }

  @MessageGuard('itemInformation')
  public async requestItemInformation(itemIdentifier: string): Promise<IItemInformationResponse> {
    const itemInformationRequest = new ItemInformationRequest(this.commonRequestDto, itemIdentifier);
    return await this.connection.send(itemInformationRequest.getMessage());
  }

  @MessageGuard('checkout')
  public async requestCheckout(checkoutRequestDto: ICheckoutRequestDto): Promise<ICheckoutResponse> {
    const checkoutRequest = new CheckoutRequest(this.commonRequestDto, checkoutRequestDto);
    return await this.connection.send(checkoutRequest.getMessage());
  }

  @MessageGuard('checkin')
  public async requestCheckin(checkinRequestDto: ICheckinRequestDto): Promise<ICheckinResponse> {
    const checkinRequest = new CheckInRequest(this.commonRequestDto, checkinRequestDto);
    return await this.connection.send(checkinRequest.getMessage());
  }

  @MessageGuard('renew')
  public async requestRenew(renewRequestDto: IRenewRequestDto): Promise<IRenewResponse> {
    const renewRequest = new RenewRequest(this.commonRequestDto, renewRequestDto);
    return await this.connection.send(renewRequest.getMessage());
  }

  @MessageGuard('renewAll')
  public async requestRenewAll(renewAllRequestDto: IRenewAllRequestDto = {}): Promise<IRenewAllResponse> {
    const renewAllRequest = new RenewAllRequest(this.commonRequestDto, renewAllRequestDto);
    return await this.connection.send(renewAllRequest.getMessage());
  }

  @MessageGuard('feePaid')
  public async requestFeePaid(feePaidRequestDto: IFeePaidRequestDto): Promise<IFeePaidResponse> {
    const feePaidRequest = new FeePaidRequest(this.commonRequestDto, feePaidRequestDto);
    return await this.connection.send(feePaidRequest.getMessage());
  }

  @MessageGuard('hold')
  public async requestHold(holdRequestDto: IHoldRequestDto): Promise<IHoldResponse> {
    const holdRequest = new HoldRequest(this.commonRequestDto, holdRequestDto);
    return await this.connection.send(holdRequest.getMessage());
  }

  @MessageGuard('endPatronSession')
  public async requestEndPatronSession(): Promise<IEndPatronSessionResponse> {
    const endPatronSessionRequest = new EndPatronSessionRequest(this.commonRequestDto);
    return await this.connection.send(endPatronSessionRequest.getMessage());
  }
}
