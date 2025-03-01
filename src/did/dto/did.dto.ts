import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class IssueCredentialDto {
  @IsString()
  @IsNotEmpty()
  subjectDid: string;

  @IsObject()
  @IsNotEmpty()
  claims: Record<string, any>;
}
