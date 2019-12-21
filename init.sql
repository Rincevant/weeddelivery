CREATE TABLE utilisateur(
	pk_utilisateur_id SERIAL PRIMARY KEY,		
	username VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	pass VARCHAR(100) NOT NULL,	
	token VARCHAR(300),	
	register_date DATE
);

/**
		JEU DE DONNEES		
**/
/* ID / NOM / PASS / ISADMIN / TOKEN / ISBAN */
INSERT INTO utilisateur VALUES (DEFAULT, 'admin', '$2y$08$hyDb7VSrBD3Vw1kH1zAe8.YhKhMjCMw9v1.WutqR2jr9LDK5y91UG', true, NULL, false);
INSERT INTO utilisateur VALUES (DEFAULT, 'Thomas', '$2y$08$RJ3HBmMggnb.l8U27jSWQ.90czPweJcmHxTLpqg6TpyjZatqK.kii', false, NULL, false);




