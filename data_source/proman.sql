--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: boards; Type: TABLE; Schema: public;
--

CREATE TABLE public.boards (
    id integer,
    title character varying(30)
);


ALTER TABLE public.boards OWNER TO kruppa;

--
-- Name: cards; Type: TABLE; Schema: public; Owner: kruppa
--

CREATE TABLE public.cards (
    id integer,
    board_id integer,
    title character varying(30),
    status_id integer,
    "order" integer
);


ALTER TABLE public.cards OWNER TO kruppa;

--
-- Name: statuses; Type: TABLE; Schema: public; Owner: kruppa
--

CREATE TABLE public.statuses (
    id integer,
    title character varying(30)
);


ALTER TABLE public.statuses OWNER TO kruppa;

--
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: kruppa
--

COPY public.boards (id, title) FROM stdin;
1	Board 1
2	Board 2
\.


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: kruppa
--

COPY public.cards (id, board_id, title, status_id, "order") FROM stdin;
1	1	new card 1	0	0
2	1	new card 2	0	1
3	1	in progress card	1	0
4	1	planning	2	0
5	1	done card 1	3	0
6	1	done card 1	3	1
7	2	new card 1	0	0
8	2	new card 2	0	1
9	2	in progress card	1	0
10	2	planning	2	0
11	2	done card 1	3	0
12	2	done card 1	3	1
\.


--
-- Data for Name: statuses; Type: TABLE DATA; Schema: public; Owner: kruppa
--

COPY public.statuses (id, title) FROM stdin;
0	new
1	in progress
2	testing
3	done
\.


--
-- PostgreSQL database dump complete
--

