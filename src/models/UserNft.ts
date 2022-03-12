export default class UserNft {
    amount: string;
    block_number: string;
    block_number_minted: string;
    contract_type: string;
    frozen: number;
    is_valid: number;
    metadata: string;
    name: string;
    owner_of: string;
    symbol: string;
    synced_at: string;
    syncing: number;
    token_address: string;
    token_id: string
    token_uri: string;

  constructor(
    amount: string, 
    block_number: string, 
    block_number_minted: string, 
    contract_type: string, 
    frozen: number, 
    is_valid: number, 
    metadata: string, 
    name: string, 
    owner_of: string, 
    symbol: string, 
    synced_at: string, 
    syncing: number, 
    token_address: string, 
    token_id: string, 
    token_uri: string
) {
    this.amount = amount
    this.block_number = block_number
    this.block_number_minted = block_number_minted
    this.contract_type = contract_type
    this.frozen = frozen
    this.is_valid = is_valid
    this.metadata = metadata
    this.name = name
    this.owner_of = owner_of
    this.symbol = symbol
    this.synced_at = synced_at
    this.syncing = syncing
    this.token_address = token_address
    this.token_id = token_id
    this.token_uri = token_uri
  }
}