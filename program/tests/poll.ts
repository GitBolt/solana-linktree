import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Poll } from "../target/types/poll";
import { BN } from "bn.js";


describe("Poll", async () => {

  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.local();

  const program = anchor.workspace.Etracker as Program<Poll>;

  const wallet = provider.wallet as anchor.Wallet;


  const pollId = 2;
  const option = 1;
  
  const [pollAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("poll"), new BN(pollId).toArrayLike(Buffer, "le", 4)],
    program.programId
  );

  const date = new Date();
  date.setDate(date.getDate() + 1);

  const [pollUserAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("poll_user"),
      wallet.publicKey.toBuffer(),
      new BN(pollId).toArrayLike(Buffer, "le", 4),
    ],
    program.programId
  );

  console.log(
    "Poll Account: ",
    pollAccount.toBase58(),
    "\nUser Account: ",
    pollUserAccount.toBase58()
  );

  it("Created Poll Account", async () => {
    const txHash = await program.methods
      .createPoll(
        pollId,
        "Is pineapple good on pizza?",
        ["No", "Yes", "Non't", "Yesn't"],
        new anchor.BN(+date)
      )
      .accounts({
        pollAccount,
        authority: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log(`Signature: ${txHash}`);
  });

  it("Created Poll User Account", async () => {
    const txHash = await program.methods
      .createPollUser(pollId)
      .accounts({
        pollUserAccount,
        authority: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log(`Signature: ${txHash}`);
  });

  it("Answer Poll", async () => {
    const txHash = await program.methods
      .answerPoll(pollId, option)
      .accounts({
        pollUserAccount,
        pollAccount,
        authority: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log(`Signature: ${txHash}`);
  });

  it("Close Poll", async () => {
    const txHash = await program.methods
      .closePoll(pollId)
      .accounts({
        pollAccount,
        authority: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log(`Signature: ${txHash}`);
  });
});
