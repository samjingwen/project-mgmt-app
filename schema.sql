drop database if exists productivvdb;

create database productivvdb;

use productivvdb;

create table users (
	user_id varchar(36) not null,
	email varchar(256) not null,
	display_name varchar(256) not null,
    password varchar(256) not null,

	primary key(user_id),
    key(email),
	key(display_name)
);

create table roles(
	role_id varchar(36) not null,
    role_name varchar(256) not null,
    
    primary key (role_id)
);

create table user_roles(
	user_id varchar(36) not null,
    role_id varchar(36) not null,
    
    primary key (user_id, role_id),
    
    constraint fk_users_user_roles_user_id
		foreign key (user_id)
        references users(user_id),
	constraint fk_roles_user_roles_role_id
		foreign key (role_id)
        references roles(role_id)
);

insert into users(user_id, email, display_name, password) values
('6219d553-ef46-4d21-b932-38a1c05963dc', 'fred@gmail.com', 'fred', sha2('fredfred', 256)), 
('7e4daecb-3699-4691-848f-fa91f77bcb3f', 'barney@gmail.com', 'barney', sha2('barneybarney', 256)),
('e21a618a-5a08-4538-a9ba-e06ba03aa121', 'wilma@gmail.com', 'wilma', sha2('wilmawilma', 256)),
('61fa7678-24c9-42d6-8581-b78988cdba77', 'betty@gmail.com', 'betty', sha2('bettybetty', 256));
    
insert into roles(role_id, role_name) values
('86030123-bd68-47dc-a92a-039e0e5b659c', 'admin'),
('4bcca1cb-dd29-4a92-a70a-0d0a8c017836', 'employee'),
('3bfe2c67-5235-4817-a8d6-9f5c9774e40a', 'customer');

insert into user_roles(user_id, role_id) values
('6219d553-ef46-4d21-b932-38a1c05963dc', '86030123-bd68-47dc-a92a-039e0e5b659c'),
('7e4daecb-3699-4691-848f-fa91f77bcb3f', '4bcca1cb-dd29-4a92-a70a-0d0a8c017836'),
('e21a618a-5a08-4538-a9ba-e06ba03aa121', '3bfe2c67-5235-4817-a8d6-9f5c9774e40a'),
('61fa7678-24c9-42d6-8581-b78988cdba77', '3bfe2c67-5235-4817-a8d6-9f5c9774e40a');