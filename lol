PGDMP     /    4                 t            agrofor_dev    9.4.1    9.5.0 �    �	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �	           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �	           1262    120527    agrofor_dev    DATABASE     }   CREATE DATABASE agrofor_dev WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'ru_RU.UTF-8' LC_CTYPE = 'ru_RU.UTF-8';
    DROP DATABASE agrofor_dev;
             pavelkononenko    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             pavelkononenko    false            �	           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  pavelkononenko    false    5            �	           0    0    public    ACL     �   REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM pavelkononenko;
GRANT ALL ON SCHEMA public TO pavelkononenko;
GRANT ALL ON SCHEMA public TO PUBLIC;
                  pavelkononenko    false    5            �            3079    12123    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            �	           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    209            �            1259    120612 
   categories    TABLE     �   CREATE TABLE categories (
    id integer NOT NULL,
    title character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
    DROP TABLE public.categories;
       public         pavelkononenko    false    5            �            1259    120610    categories_id_seq    SEQUENCE     s   CREATE SEQUENCE categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public       pavelkononenko    false    180    5            �	           0    0    categories_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE categories_id_seq OWNED BY categories.id;
            public       pavelkononenko    false    179            �            1259    120679    correspondences    TABLE     �  CREATE TABLE correspondences (
    id integer NOT NULL,
    type character varying,
    messages_count integer DEFAULT 0,
    user_ids integer[] DEFAULT '{}'::integer[],
    position_ids integer[] DEFAULT '{}'::integer[],
    new_messages json DEFAULT '{}'::json,
    last_message character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
 #   DROP TABLE public.correspondences;
       public         pavelkononenko    false    5            �            1259    120677    correspondences_id_seq    SEQUENCE     x   CREATE SEQUENCE correspondences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.correspondences_id_seq;
       public       pavelkononenko    false    192    5            �	           0    0    correspondences_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE correspondences_id_seq OWNED BY correspondences.id;
            public       pavelkononenko    false    191            �            1259    120635 
   currencies    TABLE     �   CREATE TABLE currencies (
    id integer NOT NULL,
    name character varying,
    to_usd double precision,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
    DROP TABLE public.currencies;
       public         pavelkononenko    false    5            �            1259    120633    currencies_id_seq    SEQUENCE     s   CREATE SEQUENCE currencies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.currencies_id_seq;
       public       pavelkononenko    false    184    5            �	           0    0    currencies_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE currencies_id_seq OWNED BY currencies.id;
            public       pavelkononenko    false    183            �            1259    120597    deals    TABLE       CREATE TABLE deals (
    id integer NOT NULL,
    position_id integer,
    offer_id integer,
    status character varying DEFAULT 'new'::character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
    DROP TABLE public.deals;
       public         pavelkononenko    false    5            �            1259    120595    deals_id_seq    SEQUENCE     n   CREATE SEQUENCE deals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.deals_id_seq;
       public       pavelkononenko    false    178    5            �	           0    0    deals_id_seq    SEQUENCE OWNED BY     /   ALTER SEQUENCE deals_id_seq OWNED BY deals.id;
            public       pavelkononenko    false    177            �            1259    120761    documentables    TABLE       CREATE TABLE documentables (
    id integer NOT NULL,
    document_id integer,
    documentable_id integer,
    documentable_type character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
 !   DROP TABLE public.documentables;
       public         pavelkononenko    false    5            �            1259    120759    documentables_id_seq    SEQUENCE     v   CREATE SEQUENCE documentables_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.documentables_id_seq;
       public       pavelkononenko    false    5    206            �	           0    0    documentables_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE documentables_id_seq OWNED BY documentables.id;
            public       pavelkononenko    false    205            �            1259    120657 	   documents    TABLE       CREATE TABLE documents (
    id integer NOT NULL,
    file character varying,
    user_id integer,
    position_base_id integer,
    filename character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
    DROP TABLE public.documents;
       public         pavelkononenko    false    5            �            1259    120655    documents_id_seq    SEQUENCE     r   CREATE SEQUENCE documents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.documents_id_seq;
       public       pavelkononenko    false    188    5            �	           0    0    documents_id_seq    SEQUENCE OWNED BY     7   ALTER SEQUENCE documents_id_seq OWNED BY documents.id;
            public       pavelkononenko    false    187            �            1259    120711    favorite_positions    TABLE     �   CREATE TABLE favorite_positions (
    id integer NOT NULL,
    user_id integer,
    position_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
 &   DROP TABLE public.favorite_positions;
       public         pavelkononenko    false    5            �            1259    120709    favorite_positions_id_seq    SEQUENCE     {   CREATE SEQUENCE favorite_positions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.favorite_positions_id_seq;
       public       pavelkononenko    false    5    196            �	           0    0    favorite_positions_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE favorite_positions_id_seq OWNED BY favorite_positions.id;
            public       pavelkononenko    false    195            �            1259    120749 	   feedbacks    TABLE     !  CREATE TABLE feedbacks (
    id integer NOT NULL,
    author_id integer,
    user_id integer,
    position_base_id integer,
    description text,
    positive boolean DEFAULT true,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
    DROP TABLE public.feedbacks;
       public         pavelkononenko    false    5            �            1259    120747    feedbacks_id_seq    SEQUENCE     r   CREATE SEQUENCE feedbacks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.feedbacks_id_seq;
       public       pavelkononenko    false    5    204            �	           0    0    feedbacks_id_seq    SEQUENCE OWNED BY     7   ALTER SEQUENCE feedbacks_id_seq OWNED BY feedbacks.id;
            public       pavelkononenko    false    203            �            1259    120772 
   imageables    TABLE     �   CREATE TABLE imageables (
    id integer NOT NULL,
    image_id integer,
    imageable_id integer,
    imageable_type character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
    DROP TABLE public.imageables;
       public         pavelkononenko    false    5            �            1259    120770    imageables_id_seq    SEQUENCE     s   CREATE SEQUENCE imageables_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.imageables_id_seq;
       public       pavelkononenko    false    208    5            �	           0    0    imageables_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE imageables_id_seq OWNED BY imageables.id;
            public       pavelkononenko    false    207            �            1259    120668    images    TABLE     
  CREATE TABLE images (
    id integer NOT NULL,
    file character varying,
    user_id integer,
    position_base_id integer,
    filename character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
    DROP TABLE public.images;
       public         pavelkononenko    false    5            �            1259    120666    images_id_seq    SEQUENCE     o   CREATE SEQUENCE images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.images_id_seq;
       public       pavelkononenko    false    5    190            �	           0    0    images_id_seq    SEQUENCE OWNED BY     1   ALTER SEQUENCE images_id_seq OWNED BY images.id;
            public       pavelkononenko    false    189            �            1259    120697    messages    TABLE     6  CREATE TABLE messages (
    id integer NOT NULL,
    correspondence_id integer,
    body text,
    offer json,
    user_id integer,
    message_type character varying,
    readed boolean DEFAULT false,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
    DROP TABLE public.messages;
       public         pavelkononenko    false    5            �            1259    120695    messages_id_seq    SEQUENCE     q   CREATE SEQUENCE messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.messages_id_seq;
       public       pavelkononenko    false    194    5            �	           0    0    messages_id_seq    SEQUENCE OWNED BY     5   ALTER SEQUENCE messages_id_seq OWNED BY messages.id;
            public       pavelkononenko    false    193            �            1259    120623    options    TABLE     h   CREATE TABLE options (
    id integer NOT NULL,
    title character varying,
    category_id integer
);
    DROP TABLE public.options;
       public         pavelkononenko    false    5            �            1259    120621    options_id_seq    SEQUENCE     p   CREATE SEQUENCE options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.options_id_seq;
       public       pavelkononenko    false    5    182            �	           0    0    options_id_seq    SEQUENCE OWNED BY     3   ALTER SEQUENCE options_id_seq OWNED BY options.id;
            public       pavelkononenko    false    181            �            1259    120559    position_bases    TABLE     �  CREATE TABLE position_bases (
    id integer NOT NULL,
    type character varying,
    template_name character varying,
    delta boolean DEFAULT true NOT NULL,
    status character varying,
    position_id integer,
    from_position_id integer,
    offer_id integer,
    title character varying,
    description text,
    user_id integer,
    option_id integer,
    category_id integer DEFAULT 1,
    trade_type_id integer DEFAULT 1,
    currency_id integer DEFAULT 1,
    price double precision,
    price_etalon double precision,
    price_discount double precision DEFAULT 5.0 NOT NULL,
    price_weight_dimension_id integer DEFAULT 1,
    weight double precision,
    weight_min double precision DEFAULT 0.0 NOT NULL,
    weight_etalon double precision,
    weight_min_etalon double precision DEFAULT 0.0 NOT NULL,
    weight_dimension_id integer DEFAULT 1,
    weight_min_dimension_id integer DEFAULT 1,
    index_field text,
    city character varying,
    address character varying,
    lat double precision,
    lng double precision,
    deal_with_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
 "   DROP TABLE public.position_bases;
       public         pavelkononenko    false    5            �            1259    120557    position_bases_id_seq    SEQUENCE     w   CREATE SEQUENCE position_bases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.position_bases_id_seq;
       public       pavelkononenko    false    5    176            �	           0    0    position_bases_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE position_bases_id_seq OWNED BY position_bases.id;
            public       pavelkononenko    false    175            �            1259    120730    roles    TABLE     �   CREATE TABLE roles (
    id integer NOT NULL,
    title character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
    DROP TABLE public.roles;
       public         pavelkononenko    false    5            �            1259    120728    roles_id_seq    SEQUENCE     n   CREATE SEQUENCE roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public       pavelkononenko    false    5    200            �	           0    0    roles_id_seq    SEQUENCE OWNED BY     /   ALTER SEQUENCE roles_id_seq OWNED BY roles.id;
            public       pavelkononenko    false    199            �            1259    120529    schema_migrations    TABLE     K   CREATE TABLE schema_migrations (
    version character varying NOT NULL
);
 %   DROP TABLE public.schema_migrations;
       public         pavelkononenko    false    5            �            1259    120719    trade_types    TABLE     �   CREATE TABLE trade_types (
    id integer NOT NULL,
    title character varying,
    trade_type_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
    DROP TABLE public.trade_types;
       public         pavelkononenko    false    5            �            1259    120717    trade_types_id_seq    SEQUENCE     t   CREATE SEQUENCE trade_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.trade_types_id_seq;
       public       pavelkononenko    false    5    198            �	           0    0    trade_types_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE trade_types_id_seq OWNED BY trade_types.id;
            public       pavelkononenko    false    197            �            1259    120741    user_interests    TABLE     �   CREATE TABLE user_interests (
    id integer NOT NULL,
    user_id integer,
    category_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
 "   DROP TABLE public.user_interests;
       public         pavelkononenko    false    5            �            1259    120739    user_interests_id_seq    SEQUENCE     w   CREATE SEQUENCE user_interests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.user_interests_id_seq;
       public       pavelkononenko    false    5    202            �	           0    0    user_interests_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE user_interests_id_seq OWNED BY user_interests.id;
            public       pavelkononenko    false    201            �            1259    120538    users    TABLE     ~  CREATE TABLE users (
    id integer NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    sign_in_count integer DEFAULT 0 NOT NULL,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip inet,
    last_sign_in_ip inet,
    function character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    first_name character varying,
    last_name character varying,
    avatar_id character varying,
    language character varying,
    phones character varying[] DEFAULT '{}'::character varying[],
    website character varying,
    skype character varying,
    city character varying,
    address character varying,
    lat double precision,
    lng double precision,
    currency_id integer DEFAULT 2 NOT NULL,
    company character varying,
    additional text,
    events json DEFAULT '{}'::json,
    banned boolean,
    role_id integer,
    timezone character varying,
    country character varying,
    new_offers_count integer DEFAULT 0,
    locale character varying DEFAULT 'ru'::character varying NOT NULL
);
    DROP TABLE public.users;
       public         pavelkononenko    false    5            �            1259    120536    users_id_seq    SEQUENCE     n   CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public       pavelkononenko    false    174    5            �	           0    0    users_id_seq    SEQUENCE OWNED BY     /   ALTER SEQUENCE users_id_seq OWNED BY users.id;
            public       pavelkononenko    false    173            �            1259    120646    weight_dimensions    TABLE     �   CREATE TABLE weight_dimensions (
    id integer NOT NULL,
    name character varying,
    convert double precision,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
 %   DROP TABLE public.weight_dimensions;
       public         pavelkononenko    false    5            �            1259    120644    weight_dimensions_id_seq    SEQUENCE     z   CREATE SEQUENCE weight_dimensions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.weight_dimensions_id_seq;
       public       pavelkononenko    false    186    5            �	           0    0    weight_dimensions_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE weight_dimensions_id_seq OWNED BY weight_dimensions.id;
            public       pavelkononenko    false    185            �           2604    120615    id    DEFAULT     `   ALTER TABLE ONLY categories ALTER COLUMN id SET DEFAULT nextval('categories_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    179    180    180            �           2604    120682    id    DEFAULT     j   ALTER TABLE ONLY correspondences ALTER COLUMN id SET DEFAULT nextval('correspondences_id_seq'::regclass);
 A   ALTER TABLE public.correspondences ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    191    192    192            �           2604    120638    id    DEFAULT     `   ALTER TABLE ONLY currencies ALTER COLUMN id SET DEFAULT nextval('currencies_id_seq'::regclass);
 <   ALTER TABLE public.currencies ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    184    183    184            �           2604    120600    id    DEFAULT     V   ALTER TABLE ONLY deals ALTER COLUMN id SET DEFAULT nextval('deals_id_seq'::regclass);
 7   ALTER TABLE public.deals ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    178    177    178            	           2604    120764    id    DEFAULT     f   ALTER TABLE ONLY documentables ALTER COLUMN id SET DEFAULT nextval('documentables_id_seq'::regclass);
 ?   ALTER TABLE public.documentables ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    206    205    206            �           2604    120660    id    DEFAULT     ^   ALTER TABLE ONLY documents ALTER COLUMN id SET DEFAULT nextval('documents_id_seq'::regclass);
 ;   ALTER TABLE public.documents ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    187    188    188            	           2604    120714    id    DEFAULT     p   ALTER TABLE ONLY favorite_positions ALTER COLUMN id SET DEFAULT nextval('favorite_positions_id_seq'::regclass);
 D   ALTER TABLE public.favorite_positions ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    195    196    196            	           2604    120752    id    DEFAULT     ^   ALTER TABLE ONLY feedbacks ALTER COLUMN id SET DEFAULT nextval('feedbacks_id_seq'::regclass);
 ;   ALTER TABLE public.feedbacks ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    204    203    204            	           2604    120775    id    DEFAULT     `   ALTER TABLE ONLY imageables ALTER COLUMN id SET DEFAULT nextval('imageables_id_seq'::regclass);
 <   ALTER TABLE public.imageables ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    207    208    208            �           2604    120671    id    DEFAULT     X   ALTER TABLE ONLY images ALTER COLUMN id SET DEFAULT nextval('images_id_seq'::regclass);
 8   ALTER TABLE public.images ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    189    190    190            �           2604    120700    id    DEFAULT     \   ALTER TABLE ONLY messages ALTER COLUMN id SET DEFAULT nextval('messages_id_seq'::regclass);
 :   ALTER TABLE public.messages ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    193    194    194            �           2604    120626    id    DEFAULT     Z   ALTER TABLE ONLY options ALTER COLUMN id SET DEFAULT nextval('options_id_seq'::regclass);
 9   ALTER TABLE public.options ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    181    182    182            �           2604    120562    id    DEFAULT     h   ALTER TABLE ONLY position_bases ALTER COLUMN id SET DEFAULT nextval('position_bases_id_seq'::regclass);
 @   ALTER TABLE public.position_bases ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    175    176    176            	           2604    120733    id    DEFAULT     V   ALTER TABLE ONLY roles ALTER COLUMN id SET DEFAULT nextval('roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    199    200    200            	           2604    120722    id    DEFAULT     b   ALTER TABLE ONLY trade_types ALTER COLUMN id SET DEFAULT nextval('trade_types_id_seq'::regclass);
 =   ALTER TABLE public.trade_types ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    197    198    198            	           2604    120744    id    DEFAULT     h   ALTER TABLE ONLY user_interests ALTER COLUMN id SET DEFAULT nextval('user_interests_id_seq'::regclass);
 @   ALTER TABLE public.user_interests ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    201    202    202            �           2604    120541    id    DEFAULT     V   ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    174    173    174            �           2604    120649    id    DEFAULT     n   ALTER TABLE ONLY weight_dimensions ALTER COLUMN id SET DEFAULT nextval('weight_dimensions_id_seq'::regclass);
 C   ALTER TABLE public.weight_dimensions ALTER COLUMN id DROP DEFAULT;
       public       pavelkononenko    false    186    185    186            �	          0    120612 
   categories 
   TABLE DATA               @   COPY categories (id, title, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    180   ��       �	           0    0    categories_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('categories_id_seq', 24, true);
            public       pavelkononenko    false    179            �	          0    120679    correspondences 
   TABLE DATA               �   COPY correspondences (id, type, messages_count, user_ids, position_ids, new_messages, last_message, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    192   S�       �	           0    0    correspondences_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('correspondences_id_seq', 1, true);
            public       pavelkononenko    false    191            �	          0    120635 
   currencies 
   TABLE DATA               G   COPY currencies (id, name, to_usd, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    184   ��       �	           0    0    currencies_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('currencies_id_seq', 9, true);
            public       pavelkononenko    false    183            �	          0    120597    deals 
   TABLE DATA               S   COPY deals (id, position_id, offer_id, status, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    178   ��       �	           0    0    deals_id_seq    SEQUENCE SET     4   SELECT pg_catalog.setval('deals_id_seq', 1, false);
            public       pavelkononenko    false    177            �	          0    120761    documentables 
   TABLE DATA               m   COPY documentables (id, document_id, documentable_id, documentable_type, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    206   ��       �	           0    0    documentables_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('documentables_id_seq', 1, false);
            public       pavelkononenko    false    205            �	          0    120657 	   documents 
   TABLE DATA               c   COPY documents (id, file, user_id, position_base_id, filename, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    188   ��       �	           0    0    documents_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('documents_id_seq', 1, false);
            public       pavelkononenko    false    187            �	          0    120711    favorite_positions 
   TABLE DATA               W   COPY favorite_positions (id, user_id, position_id, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    196   ��       �	           0    0    favorite_positions_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('favorite_positions_id_seq', 1, false);
            public       pavelkononenko    false    195            �	          0    120749 	   feedbacks 
   TABLE DATA               u   COPY feedbacks (id, author_id, user_id, position_base_id, description, positive, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    204   ��       �	           0    0    feedbacks_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('feedbacks_id_seq', 1, false);
            public       pavelkononenko    false    203            �	          0    120772 
   imageables 
   TABLE DATA               a   COPY imageables (id, image_id, imageable_id, imageable_type, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    208   �       �	           0    0    imageables_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('imageables_id_seq', 7, true);
            public       pavelkononenko    false    207            �	          0    120668    images 
   TABLE DATA               `   COPY images (id, file, user_id, position_base_id, filename, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    190   ��       �	           0    0    images_id_seq    SEQUENCE SET     4   SELECT pg_catalog.setval('images_id_seq', 9, true);
            public       pavelkononenko    false    189            �	          0    120697    messages 
   TABLE DATA               v   COPY messages (id, correspondence_id, body, offer, user_id, message_type, readed, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    194   ��        
           0    0    messages_id_seq    SEQUENCE SET     6   SELECT pg_catalog.setval('messages_id_seq', 1, true);
            public       pavelkononenko    false    193            �	          0    120623    options 
   TABLE DATA               2   COPY options (id, title, category_id) FROM stdin;
    public       pavelkononenko    false    182   ��       
           0    0    options_id_seq    SEQUENCE SET     7   SELECT pg_catalog.setval('options_id_seq', 327, true);
            public       pavelkononenko    false    181            �	          0    120559    position_bases 
   TABLE DATA               �  COPY position_bases (id, type, template_name, delta, status, position_id, from_position_id, offer_id, title, description, user_id, option_id, category_id, trade_type_id, currency_id, price, price_etalon, price_discount, price_weight_dimension_id, weight, weight_min, weight_etalon, weight_min_etalon, weight_dimension_id, weight_min_dimension_id, index_field, city, address, lat, lng, deal_with_id, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    176   ��       
           0    0    position_bases_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('position_bases_id_seq', 13, true);
            public       pavelkononenko    false    175            �	          0    120730    roles 
   TABLE DATA               ;   COPY roles (id, title, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    200   j�       
           0    0    roles_id_seq    SEQUENCE SET     4   SELECT pg_catalog.setval('roles_id_seq', 1, false);
            public       pavelkononenko    false    199            �	          0    120529    schema_migrations 
   TABLE DATA               -   COPY schema_migrations (version) FROM stdin;
    public       pavelkononenko    false    172   ��       �	          0    120719    trade_types 
   TABLE DATA               P   COPY trade_types (id, title, trade_type_id, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    198   �       
           0    0    trade_types_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('trade_types_id_seq', 2, true);
            public       pavelkononenko    false    197            �	          0    120741    user_interests 
   TABLE DATA               S   COPY user_interests (id, user_id, category_id, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    202   [�       
           0    0    user_interests_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('user_interests_id_seq', 5, true);
            public       pavelkononenko    false    201            �	          0    120538    users 
   TABLE DATA               �  COPY users (id, email, encrypted_password, reset_password_token, reset_password_sent_at, remember_created_at, sign_in_count, current_sign_in_at, last_sign_in_at, current_sign_in_ip, last_sign_in_ip, function, created_at, updated_at, first_name, last_name, avatar_id, language, phones, website, skype, city, address, lat, lng, currency_id, company, additional, events, banned, role_id, timezone, country, new_offers_count, locale) FROM stdin;
    public       pavelkononenko    false    174   ��       
           0    0    users_id_seq    SEQUENCE SET     3   SELECT pg_catalog.setval('users_id_seq', 2, true);
            public       pavelkononenko    false    173            �	          0    120646    weight_dimensions 
   TABLE DATA               O   COPY weight_dimensions (id, name, convert, created_at, updated_at) FROM stdin;
    public       pavelkononenko    false    186   ��       
           0    0    weight_dimensions_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('weight_dimensions_id_seq', 5, true);
            public       pavelkononenko    false    185            '	           2606    120620    categories_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public         pavelkononenko    false    180    180            4	           2606    120691    correspondences_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY correspondences
    ADD CONSTRAINT correspondences_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.correspondences DROP CONSTRAINT correspondences_pkey;
       public         pavelkononenko    false    192    192            ,	           2606    120643    currencies_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY currencies
    ADD CONSTRAINT currencies_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.currencies DROP CONSTRAINT currencies_pkey;
       public         pavelkononenko    false    184    184            "	           2606    120606 
   deals_pkey 
   CONSTRAINT     G   ALTER TABLE ONLY deals
    ADD CONSTRAINT deals_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.deals DROP CONSTRAINT deals_pkey;
       public         pavelkononenko    false    178    178            G	           2606    120769    documentables_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY documentables
    ADD CONSTRAINT documentables_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.documentables DROP CONSTRAINT documentables_pkey;
       public         pavelkononenko    false    206    206            0	           2606    120665    documents_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.documents DROP CONSTRAINT documents_pkey;
       public         pavelkononenko    false    188    188            =	           2606    120716    favorite_positions_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY favorite_positions
    ADD CONSTRAINT favorite_positions_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.favorite_positions DROP CONSTRAINT favorite_positions_pkey;
       public         pavelkononenko    false    196    196            E	           2606    120758    feedbacks_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.feedbacks DROP CONSTRAINT feedbacks_pkey;
       public         pavelkononenko    false    204    204            I	           2606    120780    imageables_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY imageables
    ADD CONSTRAINT imageables_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.imageables DROP CONSTRAINT imageables_pkey;
       public         pavelkononenko    false    208    208            2	           2606    120676    images_pkey 
   CONSTRAINT     I   ALTER TABLE ONLY images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.images DROP CONSTRAINT images_pkey;
       public         pavelkononenko    false    190    190            ;	           2606    120706    messages_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public         pavelkononenko    false    194    194            *	           2606    120631    options_pkey 
   CONSTRAINT     K   ALTER TABLE ONLY options
    ADD CONSTRAINT options_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.options DROP CONSTRAINT options_pkey;
       public         pavelkononenko    false    182    182             	           2606    120577    position_bases_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY position_bases
    ADD CONSTRAINT position_bases_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.position_bases DROP CONSTRAINT position_bases_pkey;
       public         pavelkononenko    false    176    176            A	           2606    120738 
   roles_pkey 
   CONSTRAINT     G   ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public         pavelkononenko    false    200    200            ?	           2606    120727    trade_types_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY trade_types
    ADD CONSTRAINT trade_types_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.trade_types DROP CONSTRAINT trade_types_pkey;
       public         pavelkononenko    false    198    198            C	           2606    120746    user_interests_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY user_interests
    ADD CONSTRAINT user_interests_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.user_interests DROP CONSTRAINT user_interests_pkey;
       public         pavelkononenko    false    202    202            	           2606    120554 
   users_pkey 
   CONSTRAINT     G   ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public         pavelkononenko    false    174    174            .	           2606    120654    weight_dimensions_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY weight_dimensions
    ADD CONSTRAINT weight_dimensions_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.weight_dimensions DROP CONSTRAINT weight_dimensions_pkey;
       public         pavelkononenko    false    186    186            5	           1259    120694 %   index_correspondences_on_position_ids    INDEX     `   CREATE INDEX index_correspondences_on_position_ids ON correspondences USING gin (position_ids);
 9   DROP INDEX public.index_correspondences_on_position_ids;
       public         pavelkononenko    false    192            6	           1259    120692    index_correspondences_on_type    INDEX     R   CREATE INDEX index_correspondences_on_type ON correspondences USING btree (type);
 1   DROP INDEX public.index_correspondences_on_type;
       public         pavelkononenko    false    192            7	           1259    120693 !   index_correspondences_on_user_ids    INDEX     X   CREATE INDEX index_correspondences_on_user_ids ON correspondences USING gin (user_ids);
 5   DROP INDEX public.index_correspondences_on_user_ids;
       public         pavelkononenko    false    192            #	           1259    120608    index_deals_on_offer_id    INDEX     F   CREATE INDEX index_deals_on_offer_id ON deals USING btree (offer_id);
 +   DROP INDEX public.index_deals_on_offer_id;
       public         pavelkononenko    false    178            $	           1259    120609 '   index_deals_on_offer_id_and_position_id    INDEX     c   CREATE INDEX index_deals_on_offer_id_and_position_id ON deals USING btree (offer_id, position_id);
 ;   DROP INDEX public.index_deals_on_offer_id_and_position_id;
       public         pavelkononenko    false    178    178            %	           1259    120607    index_deals_on_position_id    INDEX     L   CREATE INDEX index_deals_on_position_id ON deals USING btree (position_id);
 .   DROP INDEX public.index_deals_on_position_id;
       public         pavelkononenko    false    178            8	           1259    120707 #   index_messages_on_correspondence_id    INDEX     ^   CREATE INDEX index_messages_on_correspondence_id ON messages USING btree (correspondence_id);
 7   DROP INDEX public.index_messages_on_correspondence_id;
       public         pavelkononenko    false    194            9	           1259    120708    index_messages_on_user_id    INDEX     J   CREATE INDEX index_messages_on_user_id ON messages USING btree (user_id);
 -   DROP INDEX public.index_messages_on_user_id;
       public         pavelkononenko    false    194            (	           1259    120632    index_options_on_category_id    INDEX     P   CREATE INDEX index_options_on_category_id ON options USING btree (category_id);
 0   DROP INDEX public.index_options_on_category_id;
       public         pavelkononenko    false    182            	           1259    120583 #   index_position_bases_on_category_id    INDEX     ^   CREATE INDEX index_position_bases_on_category_id ON position_bases USING btree (category_id);
 7   DROP INDEX public.index_position_bases_on_category_id;
       public         pavelkononenko    false    176            	           1259    120591    index_position_bases_on_city    INDEX     P   CREATE INDEX index_position_bases_on_city ON position_bases USING btree (city);
 0   DROP INDEX public.index_position_bases_on_city;
       public         pavelkononenko    false    176            	           1259    120594 $   index_position_bases_on_deal_with_id    INDEX     `   CREATE INDEX index_position_bases_on_deal_with_id ON position_bases USING btree (deal_with_id);
 8   DROP INDEX public.index_position_bases_on_deal_with_id;
       public         pavelkononenko    false    176            	           1259    120579 (   index_position_bases_on_from_position_id    INDEX     h   CREATE INDEX index_position_bases_on_from_position_id ON position_bases USING btree (from_position_id);
 <   DROP INDEX public.index_position_bases_on_from_position_id;
       public         pavelkononenko    false    176            	           1259    120592    index_position_bases_on_lat    INDEX     N   CREATE INDEX index_position_bases_on_lat ON position_bases USING btree (lat);
 /   DROP INDEX public.index_position_bases_on_lat;
       public         pavelkononenko    false    176            	           1259    120593    index_position_bases_on_lng    INDEX     N   CREATE INDEX index_position_bases_on_lng ON position_bases USING btree (lng);
 /   DROP INDEX public.index_position_bases_on_lng;
       public         pavelkononenko    false    176            	           1259    120580     index_position_bases_on_offer_id    INDEX     X   CREATE INDEX index_position_bases_on_offer_id ON position_bases USING btree (offer_id);
 4   DROP INDEX public.index_position_bases_on_offer_id;
       public         pavelkononenko    false    176            	           1259    120582 !   index_position_bases_on_option_id    INDEX     Z   CREATE INDEX index_position_bases_on_option_id ON position_bases USING btree (option_id);
 5   DROP INDEX public.index_position_bases_on_option_id;
       public         pavelkononenko    false    176            	           1259    120578 #   index_position_bases_on_position_id    INDEX     ^   CREATE INDEX index_position_bases_on_position_id ON position_bases USING btree (position_id);
 7   DROP INDEX public.index_position_bases_on_position_id;
       public         pavelkononenko    false    176            	           1259    120585    index_position_bases_on_price    INDEX     R   CREATE INDEX index_position_bases_on_price ON position_bases USING btree (price);
 1   DROP INDEX public.index_position_bases_on_price;
       public         pavelkononenko    false    176            	           1259    120586 $   index_position_bases_on_price_etalon    INDEX     `   CREATE INDEX index_position_bases_on_price_etalon ON position_bases USING btree (price_etalon);
 8   DROP INDEX public.index_position_bases_on_price_etalon;
       public         pavelkononenko    false    176            	           1259    120584 %   index_position_bases_on_trade_type_id    INDEX     b   CREATE INDEX index_position_bases_on_trade_type_id ON position_bases USING btree (trade_type_id);
 9   DROP INDEX public.index_position_bases_on_trade_type_id;
       public         pavelkononenko    false    176            	           1259    120581    index_position_bases_on_user_id    INDEX     V   CREATE INDEX index_position_bases_on_user_id ON position_bases USING btree (user_id);
 3   DROP INDEX public.index_position_bases_on_user_id;
       public         pavelkononenko    false    176            	           1259    120589 +   index_position_bases_on_weight_dimension_id    INDEX     n   CREATE INDEX index_position_bases_on_weight_dimension_id ON position_bases USING btree (weight_dimension_id);
 ?   DROP INDEX public.index_position_bases_on_weight_dimension_id;
       public         pavelkononenko    false    176            	           1259    120587 %   index_position_bases_on_weight_etalon    INDEX     b   CREATE INDEX index_position_bases_on_weight_etalon ON position_bases USING btree (weight_etalon);
 9   DROP INDEX public.index_position_bases_on_weight_etalon;
       public         pavelkononenko    false    176            	           1259    120590 /   index_position_bases_on_weight_min_dimension_id    INDEX     v   CREATE INDEX index_position_bases_on_weight_min_dimension_id ON position_bases USING btree (weight_min_dimension_id);
 C   DROP INDEX public.index_position_bases_on_weight_min_dimension_id;
       public         pavelkononenko    false    176            	           1259    120588 )   index_position_bases_on_weight_min_etalon    INDEX     j   CREATE INDEX index_position_bases_on_weight_min_etalon ON position_bases USING btree (weight_min_etalon);
 =   DROP INDEX public.index_position_bases_on_weight_min_etalon;
       public         pavelkononenko    false    176            
	           1259    120555    index_users_on_email    INDEX     G   CREATE UNIQUE INDEX index_users_on_email ON users USING btree (email);
 (   DROP INDEX public.index_users_on_email;
       public         pavelkononenko    false    174            	           1259    120556 #   index_users_on_reset_password_token    INDEX     e   CREATE UNIQUE INDEX index_users_on_reset_password_token ON users USING btree (reset_password_token);
 7   DROP INDEX public.index_users_on_reset_password_token;
       public         pavelkononenko    false    174            		           1259    120535    unique_schema_migrations    INDEX     Y   CREATE UNIQUE INDEX unique_schema_migrations ON schema_migrations USING btree (version);
 ,   DROP INDEX public.unique_schema_migrations;
       public         pavelkononenko    false    172            �	   �  x�}�Q��0���Sp��b'NBϲ/���D���~ӑ`F����۱��s)S^�-�K�r'�''��%���Y�&��r{���e)wE�Lp��?@���W����h�B��v�7���0y ��A��[�ZQ�w���:��D1H<@��n�mo�OLJ�;��\���hض��7�d��\ǲ,7-E2DR����_�/���ӭ��L����� $�e�ךL� ֈ�ES����[�2����;�j��ܳ����Y���!	\��Y�7�m�� w�����@�P�)(�#��yȏ�<禺�h���(���`��uYzU������k�u���1Ow��$� 	jOB��>�N3��v<9�J�2�X���s�j	Bf������&Z~��!��'���\��~���wU�<��e����e̷��w�k]Ho��������M'      �	   u   x�eɱ�  �������8��0qT��^�`�ti�����a*�J{����ȹ��I%�Fw����I���h���E��^��� �C�����#y���˳OXݬR� ��!�      �	   �   x�}�1
�0��Y:E/�`I�lgK�R�B�����-x����G<u�sdC���db��F!�B���{�pR+B�G=�<��C��^���C���?^��f����:��-PT_0����MU���a�����X��7������5v���m�      �	      x������ � �      �	      x������ � �      �	      x������ � �      �	      x������ � �      �	      x������ � �      �	   �   x���=�0���>h��O2r���Ѕ��"Bb#i��z�������{�^����dK���B���l��+鄐A�C�r&񱠀��Hp�	a�C���x�V,tB��ǡ��F�ĩ�8��~��T�j� �%�'D� �do5      �	   6  x����J1F��S�3�&�$w��A]Hw�23����)�t��.��ާ(�@Ѷ����7r*.D��@8p��� �G��-���_��N����F}�>�9R�	��@����B��([��d ��v���H�B��Zٿ�߈+6*���E��i9O�Ip�\N�^>�JT����A<b 0U�b�R�:�amֵ]�e��C�D��	7�V~�oh�s��'?�Z��ς����^팉b���3`A� nYq���q���]V��Aܱ4�{���Zc�qd��o�����vhz�������w?kj�B���X�x;����)      �	   �   x�}��
�@E�ٯ[O���g�Z�@Df%�
	��i��:�r9[�_�U��.��p`�!;�(�\*C���
29*+�5m�B�z�ˎ��(��E��Ug{�����uA�_�}��}�s��3�| 5�(:      �	    	  x�eX˖�:\����T/�ކ�� �V[ F�ݮ��H%`|{Qu2BB��Ȕz�Y�^[7PrJ�Q��޿ 2j�s9i�i���W��`�tu�M�}L ���Eo�T��V��m�$F���%	M�W�TIJ�Mu;��a��K�(��]��u�}YR�հ�3yݵ�73��^7��Kj��w�3�BҘ`�[s�Pkݲ/$ź������7��ye8���Y��Is��Bc!;�;�t��S�3��פ�	_�*���!�8�,����[�G3�g6� ���Q����x�����w����SV�C��M,I�@Vd����#����6�<�ɽ��:�1��8�Ʋ�q�����hZ��9;�|��+��ьKi�ۿ�㪧�qEF��dX㮕oo��)�ucM��21�Po��S�'�����p��d���lp�z6Kln�юyI���i'1��΋SQ��\a�1up�.R�7��˄:[)�~���F�z��<�9͋���Nr�p��)��2v�grp{��vG��aMj�;<8�Χs�a�����i��~q��4la�f�G�G��̫α�^.�
��\�tc.�X�p\~i�
#���٪9d�����d-l#���Li�X6���� f�����"4�זQI��+09dɚ0E%��q��Z|�x�:���0Kͺ�����S�!�2��sa�CZ�'Ŷ��2z:�iR��p���W��m�I��f�m+I�����W5�X��p��.9���\��֓O�r[X��v���[�
fM�wao	���:�	�}5S2�X�^LPN��ZvF|��(W��-ę�3��V�h�GOܠ������Wh�	�5\C/�.7`��^:L����#D�僙�|�G��A���Gպ�6�ͬn�%�C~�ų�2����Y���y6!�-r�ۀ`b&���# �D�]k��Hn�&��A�d�N;\��An��{���L3��g�a\��5n�7�q����;�B����jĶH�t�lg�4��LQ��I�m.���<=�����hZ�1�L�'ӯہ�W
V~6!�P�r&��
f��� ���z���~�4�K+�!=h��4�+ߔA���p�.lY��#��a�GF�/�9:  ���/ܢ���%1Ȅ܋��7��&�Ӑ'vVȌ���j���h�2E,݋�Gĺo�'8(�^GC��Y�*���~+�L������7,:�@�'u�x7Da�h�ᰀ�W
����Z`�X�`o0,��u����� �k� @=約�&�Rnc���Q욞�t��C�VBc���.Ԉ�R�\·]gf���EY���"B���Ђ3�\G����7�a��B���0iZPJ6��S���o���0��"Cژ�9�ר���#[��ֵ$&�q^NO j'�%l$V!i���m�����@�{1Qk}�p�Zlh��s��($?�	^OӘ�Q�fڦƚp^ j��#d�}H�p�l�r+H��ث�i�%Yt�E�|spH�B�?r��:�%q匨�������t��D�l*���F�ao�$ΕA�_9�顸>vF^Y��n��K�9Q�O��ѷ�w��s2���Þe!�G��K5fp��c��]�� ��I8Y����K}|�s�#w�fL$<�v��nVG�i���[w$v3큪�QOē>����sL���� �5Br�t�%$|�@c�6^7gk�U�����L�����M��$��e�<�����f*��S���m��x\�D�_	��S�
���F5�%`���	-��
*0�ϭ�%��G�#��)l��Z��f�M�v
�PČ�H�D^L{�4������X=�i�����  �%`' <���қ7�(��W�g�(���B^���,0����Q�
�$i"�o�u�$8'��}��wz�V	,ה/���(�aW����,*�N�Op8�µ���~<2\���H�~�Od��R~��w�h�7��d���U	f!����8�=��*�b�$��'�~Ӱ3�����h�`\>���I��+�k=|�}BTj�fMi��3�Y�N�<��Ƌs���#�p9���Մ�f��8	��-Ȍ�L��Rf��[�K1�z�p��_W���s#ROBs�l[q�bA5���)��'�!v�I��T2��[d����3����&(��Fi
����*�`��&W�bF�[:~�J3`�HճC D�2�Qn[��"���1-�k+��<�+d�{�\;piD)�f�8%��v^;�������N���ªQ      �	   �  x��XKoG>���g<�w��-("\��DJ.\��hYqØ@�Qx%����;�`X�m�B�?�W5�����kGI����touW�|U�U���������Bvꫬ�-^.ʳԮ�������۴��ӦHi��^�H���i�Z�}�n�����&��#�&~L�GԬc(+��1�V�W�Dz�^Ι�"���=]�1ʹ��֪�j	�n@�2���V�B��6�,U7�����14s�֡g����0u|>���t�2�2�F|�t���E�?����?"!�+ϗ����qr���-��,�a�ԟ�D�/H3T�����G��a�չ�+�[�2d�-�������i�Qau�Md6��I+]�|��L��X8d�Q�V�R�9��Tʶ�kK�F��O�\�B۲���>��5l�Z��~��[2�͙$�s�8]v��@��N��^*/..��*�aS��q��O`�G��VEz�~D�a��h��B�t�14*H�d����Pix�Q�z��8���M[���`
5.�:�Rˢ�f�E�k�z"mV��Km��e�ࣟ�Li���;U�'�k��|y�����%{�x`t�a����Pj�(P_U�f�ZIc]���5�R�`����IX�lۘ;�W�I��U�;���aD���>�2p���h�KE:�i_����P��ݫ�+�˗/�"�
 ºA��j0!mmj|b�!�1���5���W�SAI
�<x����(��]۩< 
B�G�
� �SUwjP��{n�tp�`� `�W.�cݲs	��_S�>(:8H�����_8L��
c�3R;+�u5U*�v�+h�?m��L���g���/���4q�i���٬�t�%�1�h�!f�����|��8v�*%�#�a1`]�2(;䬻�|xBr�UN�w1�>�/��	���k7�F�s��٭7�V��d<��f$�oDF3���]Zy�`2��J�I�9��1G(5n�QQ��e��M�oj	���� ��B� �5�Q'>�{��Ҵ��)Ϟ���vz�r�An������3�5�ꢈLD6X�Ё�-�l�|�>j��lg�&>���h�,�m�����>�a�	6��{R�	`�l�e'��'��3C>6s�/��˸��;e��F�������}�G�2��|٤����q�k���n�c.yɽj��'���)D�\�km��Ya��ߏ�8�?���͸6-!*Shp�D�j�(<��΋jd�<�ik�P��I��CJU��-�f��6�8c�єu��
�RO�����=��R��.睲�_*�1!�b��o�r��2FTl�K5,�4갈9��=�8�R��0*ja�8����x:���!庆r�������CǦ�@�m���q�)��v��g��[��v����{��MZF��d�N�!�^�!�e��xKB�R
F 㺉-	p�m)�PH��>����ܹ�[��9ӛ���� ���؟��:�P�r���a����vd��(G?j�cS5����9!�,;=q�,�	��ܣ�ud��m�O�����R��GԚ��3�}��3�yײ{��w-��}A��^wC���gz_ѯn����j���6��5�jۓ�`c��Eێ�տ��G�Q���!?7�16Vy�y4��z�#�qQ��(�e%�U��^O�+弊�u*o�Z}�q=      �	      x������ � �      �	   p   x�U��C1�{��l	٥��Q��4����AB` ���M7�!�f���J~3�� &�9**�?�4#.�q��rbMI8!S.
��͂ӟ���i}�Q=g(xsփ�Wk��3r      �	   D   x�3�L*��4�4204�50�5�P04�22�20�35623��#�e�Y����i�U�����	n�=... j �      �	   k   x�}���0kq�,`A���Y��Q
��u��@A���a8�?��}dU��b��g�\TZc�������a�N¸ARg�Z�5k�������oM[6���Ar��| K8x      �	   �  x��S�NA��>�H���Nffwvg�J���T��X���1
���!���Gh
�K��ξ�g�[�j���gvf�9���wv�1�t�y�f2�'�E�W��r�[�376x���҈[\���_ͪ{��
�{�UG�,/-�NM�F��@�č�7�ɸ��o_r�(i1�O&.\���f���\)�����Bq�<>Cj�4�+�pM��mh@')�W=7\rݓ��(陈����e�7h���:���t�-���V3�#Λqm��b��IrbF��Ol��a�THf3饗��aힴ\�^���*3�R�w��
�
]

�Ζ潡�Q�_���7-�'ƋwV���_Vf+'d9�������<��m�v}Ψ��WL�/��*]�����"�eK�zֺ�]_pT����3�,*0�'8�.��Ԁ/Z����7���bP�4Z�>����4m}Y��r!(�W�c�Q�p� n&r�>��U�	�2$��%\���&���G�i�7���=ރ��)!x����!nW�]�8F��"�$G�(8#hgl�v�P�(�꓆�[$Ak ��b��"�"t?���i[KL����j�ZC$VӖHwp��Tw-����jt&�`FhE�[|w�K#!$RE`}���휚��stL�}���ñ���L���q      �	   v   x�}�1�0���>h�lǉӳ��
EB��X�z����RHY ��ElU_ERZ�b��> �7G�>6zn�����[ظ�#���y�XӘ;ݻ�F2���:�Ti������ A      