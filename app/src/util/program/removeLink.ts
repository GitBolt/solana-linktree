import * as anchor from '@coral-xyz/anchor'
import { anchorProgram } from '@/util/helper';

export const removeLink = async (
  wallet: anchor.Wallet,
  accountId: number,
  linkName: string,
  linkUrl: string,
) => {
  const program = anchorProgram(wallet);

  const [linkAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("link_account"),
      new anchor.BN(accountId).toArrayLike(Buffer, "le", 4),
      Buffer.from(linkName),
    ],
    program.programId
  );

  try {

    const sig = await program.methods
      .removeLink(accountId, linkName, linkUrl)
      .accounts({
        linkAccount,
        authority: wallet.publicKey,
      })
      .rpc();

    return { error: false, sig }

  } catch (e: any) {
    console.log(e)
    return { error: e.toString(), sig: null }
  }
}