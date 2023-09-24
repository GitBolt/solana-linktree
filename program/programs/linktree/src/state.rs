use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct LinktreeAccount {
    pub id: u32,
    pub owner: Pubkey,
    pub profile_link: String,
    pub bg_color: String,
    pub link_count: u16,
}

#[account]
#[derive(Default)]
pub struct IndividualLink {
    pub linktree_id: u32,
    pub link_name: String,
    pub link_url: String,
}
