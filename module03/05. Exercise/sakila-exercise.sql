-- exercise yg pake world_db di skip aja. Ga ada port postgres-nya.

-- ini semua pake sakila ya, pake yg udah ada aja.

-- Show all data using IN, and display the country_id and country columns of the following countries: China, Bangladesh, and India
select c.country_id, c.country  from country c where c.country in ('China', 'Bangladesh', 'India'); 

-- Find every actors whose last names contain the letters OD. Order the rows by last name and first name, in that order
-- ilike untuk search yang sifatnya case insensitive
-- % adalah placeholder yang membaca 1 atau lebih character apapun sebagai true
-- di contoh ini jika nama belakangnya WOODY. WO di depan dan Y di belakang akan dibaca oleh % sebagai ada karakter yang menghimpit OD
-- search OD diantara karakter tersebut.
select a.actor_id, a.first_name, a.last_name from actor a where a.last_name ilike '%od%' order by a.first_name, a.last_name;


-- Modify table actors. Add a middle_name column to the table actor. Position it between first_name and last_name. Hint: you will need to specify the data type.
alter table actor add column if not exists middle_name varchar(100);

-- List every last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors
select count(a.last_name) last_name_count, a.last_name from actor a group by a.last_name having count(a.last_name) >= 2;  

-- Join the table and display the first and last names, as well as the address, of each staff member.
select s.first_name, s.last_name, a.address from staff s join address a on a.address_id = s.address_id;

-- Find out how many copies of the film “Hunchback Impossible” exist in the inventory system
select count(f.title) copies, f.title from inventory i join film f on i.film_id = f.film_id group by f.title having f.title ilike 'Hunchback Impossible';

-- Find and display the most frequently rented movies in descending order.
select count(r.rental_id) rental_count, f.title from rental r join inventory i on r.inventory_id = i.inventory_id join film f on i.film_id = f.film_id group by f.film_id, f.title order by count(r.rental_id) desc;

-- Write down a query in order to display each store its store ID, city, and country
select s.store_id, c.city, c2.country from store s join address a on s.address_id = a.address_id join city c on a.city_id = c.city_id join country c2 on c.country_id = c2.country_id;

-- Use subqueries to display every actors who appear in the film Alone Trip.
-- Subquery juga bisa dipakai untuk mencari nilai kolom dari table lain tanpa menggunakan join.
-- Jika kita mau melakukan hal yang sama tanpa subquery berarti kita harus menggunakan join dulu ke table film.
-- Dalam kasus query ini, kita menggunakan subquery untuk mencari actor_id dari table film_actor
-- yang memiliki film_id yang sama dengan film_id dari table film yang memiliki title 'ALONE TRIP'.

select first_name, last_name
from actor
where actor_id in (
    select actor_id 
    from film_actor 
    where film_id = (select film_id from film where title = 'ALONE TRIP')
);

-- Delete the middle_name column from table actors
alter table actor drop column if exists middle_name; 