drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products (
    item_id int not null auto_increment,
    product_name varchar (64) null,
    department_name varchar (64) null,
    price int,
    quantity int,
    primary key(item_id)
);

use bamazon;
select * from products