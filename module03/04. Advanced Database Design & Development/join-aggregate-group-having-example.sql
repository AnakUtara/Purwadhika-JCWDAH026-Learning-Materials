select 
	address,
	city,
	postal_code,
	country
from address a 
join city c 
on a.city_id = c.city_id
join country cn
on c.country_id = cn.country_id
;

SELECT 
	fa.actor_id,
	first_name,
	last_name,
	fa.film_id,
	title,
	description,
	release_year,
	length,
	rating
FROM film_actor fa
INNER JOIN actor ON fa.actor_id = actor.actor_id
inner join film on fa.film_id = film.film_id
where rental_duration  > (
	select AVG(rental_duration) from film
);

SELECT 
	count(title),
	rating
FROM film_actor fa
INNER JOIN actor ON fa.actor_id = actor.actor_id
inner join film on fa.film_id = film.film_id
group by rating
having count(title) >= 1100
;

SELECT 
	count(title) film_count,
	first_name,
	last_name
FROM film_actor fa
INNER JOIN actor ON fa.actor_id = actor.actor_id
inner join film on fa.film_id = film.film_id
group by first_name, last_name
order by film_count desc
limit 5
;

SELECT 
	AVG(length) average_film_duration,
	first_name,
	last_name
FROM film_actor fa
INNER JOIN actor ON fa.actor_id = actor.actor_id
inner join film on fa.film_id = film.film_id
group by first_name, last_name
;

select * from payment p 
join customer c on p.customer_id  = c.customer_id
join staff s on p.staff_id = s.staff_id
join rental r on p.rental_id = r.rental_id
;

select 
	c.first_name cust_fname,
	c.last_name cust_lname,
	s.first_name st_fname,
	s.last_name st_lname,
	amount,
	payment_date,
	r.rental_date,
	r.return_date
from payment p 
join customer c on p.customer_id  = c.customer_id
join staff s on p.staff_id = s.staff_id
join rental r on p.rental_id = r.rental_id
;

select 
	SUM(amount) total_cuan,
	c.customer_id,
	c.first_name,
	c.last_name 
from payment p 
join customer c on p.customer_id  = c.customer_id
join staff s on p.staff_id = s.staff_id
join rental r on p.rental_id = r.rental_id
group by c.customer_id, c.first_name, c.last_name 
having sum(amount) >= 100
order by sum(amount) desc 
limit 10
;