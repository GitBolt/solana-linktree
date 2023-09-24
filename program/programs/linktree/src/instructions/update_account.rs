use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
#[instruction(account_id : u32)]
pub struct UpdateAccount<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"linktree_account", account_id.to_le_bytes().as_ref()], 
        bump
    )]
    pub linktree_account: Account<'info, LinktreeAccount>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<UpdateAccount>,
    account_id: u32,
    profile_link: String,
) -> Result<()> {
    let linktree_account = &mut ctx.accounts.linktree_account;

    linktree_account.profile_link = profile_link;

    msg!("Updated an account! Id: {}", account_id);
    Ok(())
}
