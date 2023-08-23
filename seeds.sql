INSERT INTO department (name)
VALUES ("Sales"),
       ("Development"),
       ("Management"),
       ("other");

INSERT INTO role (title,salary,department_id)
VALUES ("Sales Lead",100,1),
       ("Sales ",50,1),
       ("Manager",150,1),
       ("Developer",70,2);

       INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Bob","Bills",1,1),
       ("John","Doe",2,2),
       ("Jack","Johnson",3,3),
       ("Jane","Doe",4,4);