import * as anchor from '@coral-xyz/anchor'
import { anchorProgram } from '@/util/helper';

export const createPoll = async (
  wallet: anchor.Wallet,
  pollId: number,
  title: string,
  options: string[],
  endDate: number,
) => {
  console.log(endDate)
  const program = anchorProgram(wallet);

  const [pollAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("poll"), new anchor.BN(pollId).toArrayLike(Buffer, "le", 4)],
    program.programId
  );


  try {

    const sig = await program.methods
      .createPoll(
        new anchor.BN(pollId),
        title,
        options,
        new anchor.BN(endDate)
      )
      .accounts({
        pollAccount,
        authority: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }).rpc()

    return { error: false, sig }

  } catch (e: any) {
    console.log(e)
    return { error: e.toString(), sig: null }
  }
}