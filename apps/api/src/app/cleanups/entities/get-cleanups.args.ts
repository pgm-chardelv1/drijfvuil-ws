import { ArgsType } from '@nestjs/graphql';
import { GetReportsArgs } from '../../reports/dto/get-reports.args';

@ArgsType()
export class GetCleanupsArgs extends GetReportsArgs {}
