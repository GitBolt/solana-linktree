import * as anchor from '@coral-xyz/anchor'
import { anchorProgram } from '@/util/helper';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';

export const getLinksByProfile = async (
  wallet: anchor.Wallet,
  profile: string,
) => {
  const program = anchorProgram(wallet);
  try {
    // @ts-ignore
    let linktreeProfile = await program.account.linktreeAccount.all([
        {
            memcmp: {
                offset: 8 + 8,
                bytes: bs58.encode(Buffer.from("bolt")),

            }
        }
    ])

    // @ts-ignore
    let data = await program.account.individualLink.all([
      {
        memcmp: {
          offset: 8,
          bytes: anchor.utils.bytes.bs58.encode(Uint8Array.from([linktreeProfile[0].account.id])),
        },
      },
    ]);
    return { sig: data, error: false }

  } catch (e: any) {
    console.log(e)
    return { error: e.toString(), sig: null }
  }
}
