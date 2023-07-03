--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Item" (
    "Id" integer NOT NULL,
    "UserId" integer NOT NULL,
    "Item Name" character varying(1000) NOT NULL,
    "Description" character varying(1000),
    "Quantity" integer DEFAULT 0
);


ALTER TABLE public."Item" OWNER TO postgres;

--
-- Name: Item_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Item_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Item_Id_seq" OWNER TO postgres;

--
-- Name: Item_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Item_Id_seq" OWNED BY public."Item"."Id";


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    "Id" integer NOT NULL,
    "First Name" character varying(1000) NOT NULL,
    "Last Name" character varying(1000) NOT NULL,
    "Username" character varying(1000) NOT NULL,
    "Password" character varying(1000) NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_Id_seq" OWNER TO postgres;

--
-- Name: User_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_Id_seq" OWNED BY public."User"."Id";


--
-- Name: Item Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Item" ALTER COLUMN "Id" SET DEFAULT nextval('public."Item_Id_seq"'::regclass);


--
-- Name: User Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN "Id" SET DEFAULT nextval('public."User_Id_seq"'::regclass);


--
-- Data for Name: Item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Item" ("Id", "UserId", "Item Name", "Description", "Quantity") FROM stdin;
4	1	test2	test3	2
5	1	asdf	hahahahahha	2
10	1	sapphire	Exquisite Sapphire Ring: A symbol of opulence and grace, this captivating piece features a dazzling sapphire encased in a shimmering halo of diamonds, creating a harmonious blend of luxury and sophistication. With its intricate detailing and impeccable craftsmanship, this ring is sure to adorn your finger with timeless beauty, making a statement wherever you go.	6
1	1	topazes	oh yay hahaha yes now Exquisite Sapphire Ring: A symbol of opulence and grace, this captivating piece features a dazzling	7
11	7	desk	solid wood yes?	546
12	7	gold	Pure Elegance in Gold: Crafted from finest 24k gold, this exquisite piece exudes luxury and sophistication, an enduring symbol of prosperity and timeless beauty.	1000
14	12	Diamond	New Mesmerizing brilliance radiates from the center stone, surrounded by a dazzling halo. This exquisite piece epitomizes eternal love and refined elegance.	11
16	7	asd	tae gag haher	4
17	13	test's item	test's short description edited	5
18	13	test's item	test's long description: Comprehensive Proficiency Test: Designed to assess your knowledge across various domains, this thorough examination challenges your skills, critical thinking, and problem-solving abilities. With carefully curated questions, it provides valuable insights into your strengths and areas for improvement, serving as a benchmark for personal growth and development. As you embrace the challenge, you'll discover the depths of your potential and gain a better understanding of your capabilities.	158
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" ("Id", "First Name", "Last Name", "Username", "Password") FROM stdin;
1	first	last	uname	$2a$06$fZYjYvu1XdjjwF7iFx5dcesCQCcsaCx9/DSZXiWp5fp/Ttdquj3aO
3	king	kong	user	$2b$10$SJ8wZReTG8Zd5FmSRzXcguaFeUvnakeou1JfNGeBUN.oFtmOWWC4W
4	king2	kon2	meow	$2b$10$rVyA6R/bqESx3FCDobfiW.9m/oY56GQ1cukYdW9n25HiJYGkKTE6S
5	king3	kong3	woof	$2b$10$ELGxKQoOo.uV3o6Wo.OCCOv9pLsk.iUQIMD3MiDVLjBUccOq2Qpb6
6	king4	kong4	woofy	$2b$10$HjmE/g/cvWFgBr.N80Ll5efGFn.2FgYBnnpyZEr16RdAjTqVLjR/u
7	a	b	c	$2b$10$Wx4W1.qFfgK51z3oMQmneeXpkU2CpYIL/UnEEaJ8Y7a.hcnEs6PLm
8	aa	bb	cc	$2b$10$FZF3TS4GiQulrdhwvKi.WuhMMnUst6Bbv49FS7v5b1RC.3Ck.3s6O
9	aaa	bbb	ccc	$2b$10$QlrKlJthhIHHOPohv7xFZe45Yui1ZFXG6rGuz8fnq8XDOwsBwm4r6
10	q	w	e	$2b$10$z0GGdAfssiEO.0Q/Oj91Eub1sulH/DnvYmxcdLH8DxN6v9NBf8oi2
11	w	e	r	$2b$10$wWqsZaM5o.IhFPS92cX8pOeH870FmHCzi/nT9Xab5DLBJxsmgPZDe
12	Min	Kang	Min	$2b$10$1Uwn6V2mJjXa54FlE.2c9eKYmbArkoG0IU2UxCWSiNzsc4P9FXk3a
13	test	test	test	$2b$10$kYutww5HylGe4XtAMCzAleOOLfkR1/WyT/ZiLWYKVJsF0n5AHyxRG
\.


--
-- Name: Item_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Item_Id_seq"', 19, true);


--
-- Name: User_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_Id_seq"', 13, true);


--
-- Name: Item Item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Item"
    ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("Id");


--
-- Name: User User_Username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_Username_key" UNIQUE ("Username");


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Id");


--
-- Name: Item Item_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Item"
    ADD CONSTRAINT "Item_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."User"("Id");


--
-- PostgreSQL database dump complete
--

