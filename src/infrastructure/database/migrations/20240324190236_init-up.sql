-- auto-generated definition
create table api_test
(
    id          serial
        primary key,
    name        text,
    description text,
    uuid        varchar(255) default gen_random_uuid() not null,
    created_at  timestamp    default CURRENT_TIMESTAMP not null
);