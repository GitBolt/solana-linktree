use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct LinktreeAccount {
    pub id: u32,
    pub profile_link: String,
    pub owner: Pubkey,
    pub link_count: u16,
}

#[account]
#[derive(Default)]
pub struct IndividualLink {
    pub linktree_id: u32,
    pub link_name: String,
    pub link_url: String,
}
