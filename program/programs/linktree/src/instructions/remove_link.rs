use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
#[instruction(linktree_id : u32, link_name: String)]
pub struct RemoveLink<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        close = authority,
        seeds = [b"link_account", linktree_id.to_le_bytes().as_ref(), link_name.as_ref()], 
        bump
    )]
    pub link_account: Account<'info, IndividualLink>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<RemoveLink>,
    linktree_id: u32,
    link_name: String,
    link_url: String,
) -> Result<()> {
    let link_account = &mut ctx.accounts.link_account;

    link_account.linktree_id = linktree_id;
    link_account.link_name = link_name;
    link_account.link_url = link_url;

    msg!("Remove a link!");
    Ok(())
}
