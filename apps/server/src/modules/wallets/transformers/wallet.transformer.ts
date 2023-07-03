import { Wallet } from '@libs/entities/entities/Wallet';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { WalletResponse } from '../responses/wallet.response';

export class WalletTransformer extends BaseResponseTransformer {
  public static toWalletTransformer(wallet: Wallet): WalletResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(wallet),
      creator: null,
      updater: null,
    };
  }
}
