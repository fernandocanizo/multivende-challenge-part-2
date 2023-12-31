create table if not exists status (
  name text not null default 'waiting-for-creation' primary key
);

insert into status (name) values
  ('waiting-for-creation'),
  ('created')
  on conflict do nothing
  ;

create table if not exists product (
  id serial primary key,
  name text not null,
  inventory_type_id text not null default '791a6654-c5f2-11e6-aad6-2c56dc130c0d',
  internal_code_type_id int default null,
  -- this should be another table, cause it's an array but since this is a mock
  -- up to test loading products, I'll put them here, since I'll be only sending
  -- one of these objects
  fk_status text not null default 'waiting-for-creation',
  pv_is_default_version boolean not null default true,
  pv_position int not null default 0,

  foreign key(fk_status) references status(name)
);

create table if not exists auth (
  id serial primary key,
  created_on timestamp not null default now(),
  oauth_client_id text not null,
  merchant_id text not null,
  merchant_app_id text not null,
  expires_at text not null,
  refresh_token text not null,
  refresh_token_expires_at text not null,
  token text not null
);
