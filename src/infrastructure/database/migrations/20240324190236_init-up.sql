-- auto-generated definition
create table spot_price
(
    id                serial,
    price             numeric                             not null,
    timestamp         timestamp                           not null,
    created_timestamp timestamp default CURRENT_TIMESTAMP not null
);

comment on table spot_price is 'saves spot prices';

create unique index spot_price_timestamp_uindex
    on spot_price (timestamp);