const Pool = require("pg").Pool;
const { exec } = require("child_process");
const fs = require("fs");

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "hero",
  password: "postgres",
  port: 5432,
});

const generateInventory = async () => {
  try {
    const result = await client.query("SELECT * FROM hosts");

    let inventory = "";

    result.rows.forEach((row) => {
      // Define the host header
      inventory += `[${row.name}]\n`;

      // Set basic Ansible variables
      inventory += `ansible_host=${row.ip1} ansible_user=${row.user} `;

      // Use either private key or password depending on what is available
      if (row.ssh_type == "key") {
        inventory += `ansible_ssh_private_key_file=${row.ssh_private_key_file}\n`;
      } else if (row.ssh_type == "pwd") {
        inventory += `ansible_ssh_pass=${row.password}\n`;
      }

      inventory += "\n"; // Add a newline between host definitions
    });

    // Write the inventory to the ansible/inventory file
    fs.writeFileSync("./ansible/inventory", inventory);

    console.log("Ansible inventory generated successfully.");
  } catch (err) {
    console.error("Error generating inventory:", err);
  }
};

const getHosts = (request, response) => {
  pool.query("SELECT * FROM hosts ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const newHost = (request, response) => {
  const { name, project, ip1, ssh_type, ssh_key, login, password } =
    request.body;

  pool.query(
    "INSERT INTO hosts(name, project, ip1, ssh_type, ssh_key, login, password) VALUES($1, $2, $3, $4, $5, $6, $7);",
    [name, project, ip1, ssh_type, ssh_key, login, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Host added`);
    }
  );
};

const updateHost = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, project, ip1, ssh_type, ssh_key, login, password } =
    request.body;

  pool.query(
    "UPDATE hosts SET name = $1, project = $2, ip1 = $3, ssh_type = $4, ssh_key = $5, login = $6, password = $7  WHERE id = $8",
    [name, project, ip1, ssh_type, ssh_key, login, password, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Host updated with ID: ${id}`);
    }
  );
};

const getOneHost = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT hosts Where id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const deleteHost = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM hosts Where id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Host deleted with ID: ${id}`);
  });
};

//const getMemberById = (request, response) => {
//    const id = parseInt(request.params.id)
//
//    pool.query('SELECT * FROM stemma WHERE id = $1', [id], (error, results) => {
//        if (error) {
//            throw error
//        }
//        response.status(200).json(results.rows)
//    })
//}
//
//const getBrothers = (request, response) => {
//    const id = parseInt(request.params.id)
//
//    pool.query('SELECT * FROM stemma WHERE parent_id = (SELECT parent_id FROM stemma WHERE id = $1) AND id != $1', [id], (error, results) => {
//        if (error) {
//            throw error
//        }
//        response.status(200).json(results.rows)
//    })
//}
//
//const getChildren = (request, response) => {
//    const id = parseInt(request.params.id)
//
//    pool.query('SELECT * FROM stemma WHERE parent_id = $1', [id], (error, results) => {
//        if (error) {
//            throw error
//        }
//        response.status(200).json(results.rows)
//    })
//}
//
//const searchMembers = (request, response) => {
//    const name = request.params.name
//    const fathername = request.params.fathername
//    pool.query("SELECT \
//                son.id son_id, father.id father, son.name son,father.name father, \
//                son.name <-> $1 as score1,  \
//                father.name <-> $2 as score2\
//                FROM stemma son \
//                JOIN stemma father \
//                ON son.parent_id = father.id \
//                ORDER BY score1, score2 limit 10;", [name, fathername], (error, results) => {
//        if (error) {
//            throw error
//        }
//        response.status(200).json(results.rows)
//    })
//}
//
//const getZhetiAta = (request, response) => {
//    const id = parseInt(request.params.id)
//    pool.query("WITH RECURSIVE r AS ( \
//                    SELECT id, parent_id, name, 1 AS level \
//                    FROM stemma \
//                    WHERE id = $1 \
//                    UNION ALL \
//                    SELECT stemma.id, stemma.parent_id, stemma.name, r.level + 1 AS level \
//                    FROM stemma \
//                    JOIN r \
//                    ON stemma.id = r.parent_id \
//                ) \
//                SELECT * FROM r LIMIT 7;", [id], (error, results) => {
//        if (error) {
//            throw error
//        }
//        response.status(200).json(results.rows)
//    })
//}
//
//const getOrderdShezhire = (request, response) => {
//    const id = parseInt(request.params.id)
//    pool.query("WITH RECURSIVE r AS ( \
//                    SELECT id, parent_id, name, 1 AS level \
//                    FROM stemma \
//                    WHERE id = 2 \
//                    UNION ALL \
//                    SELECT stemma.id, stemma.parent_id, stemma.name, r.level + 1 AS level \
//                    FROM stemma \
//                    JOIN r \
//                    ON stemma.parent_id = r.id \
//                ) \
//                SELECT * FROM r ORDER BY level;", (error, results) => {
//        if (error) {
//            throw error
//        }
//        response.status(200).json(results.rows)
//    })
//}
//
//
//const getAllAta = (request, response) => {
//    const id = parseInt(request.params.id)
//    pool.query("WITH RECURSIVE r AS ( \
//                    SELECT id, parent_id, name, 1 AS level \
//                    FROM stemma \
//                    WHERE id = $1 \
//                    UNION ALL \
//                    SELECT stemma.id, stemma.parent_id, stemma.name, r.level + 1 AS level \
//                    FROM stemma \
//                    JOIN r \
//                    ON stemma.id = r.parent_id \
//                ) \
//                SELECT * FROM r;", [id], (error, results) => {
//        if (error) {
//            throw error
//        }
//        response.status(200).json(results.rows)
//    })
//}
//
//const sendChanges = (request, response) => {
//    const changes = JSON.stringify(request.body)
//    pool.query('INSERT INTO public.changes(changes,status,sent_date) VALUES($1, \'new\', now());', [request.body], (error, results) => {
//        if (error) {
//            throw error
//        }
//        response.status(201).send(`Changes accepted`)
//    })
//}
//
//const sendMessage = (request, response) => {
//    const message = JSON.stringify(request.body)
//    pool.query('INSERT INTO public.messages(message,status,sent_date) VALUES($1, \'new\', now());', [message], (error, results) => {
//        if (error) {
//            throw error
//        }
//        response.status(201).send(`Changes accepted`)
//    })
//}
//
////--------------------------------------------------------------------------------------------
//// Unusd
////--------------------------------------------------------------------------------------------
//
//const createMember = (request, response) => {
//    const { name, surname,patronymic, parent_id } = request.body
//
//    pool.query('INSERT INTO public.stemma(name, surname, patronymic, parent_id) VALUES($1, $2, $3, $4);', [name, surname, patronymic, parent_id], (error, results) => {
//        if (error) {
//            throw error
//        }
//        response.status(201).send(`Member added`)
//    })
//}
//
//const updateMember = (request, response) => {
//    const id = parseInt(request.params.id)
//    const { name, surname, patronymic, date_of_birth, date_of_death, info } = request.body
//    console.log(name, surname, patronymic, date_of_birth, date_of_death, info)
//    pool.query(
//        'UPDATE stemma SET name = $1, surname = $2, patronymic = $3, date_of_birth = $4, date_of_death = $5, info = $6  WHERE id = $7',
//        [name, surname, patronymic, date_of_birth, date_of_death, info, id],
//        (error, results) => {
//            if (error) {
//                throw error
//            }
//            response.status(200).send(`Member modified with ID: ${id}`)
//        }
//    )
//}
//
//const deleteMember = (request, response) => {
//    const id = parseInt(request.params.id)
//
//    pool.query('DELETE FROM stemma WHERE id = $1', [id], (error, results) => {
//        if (error) {
//            throw error
//        }
//        response.status(200).send(`Member deleted with ID: ${id}`)
//    })
//}
//
//const getEditRequests = (request, response) => {
//    pool.query("SELECT * FROM changes WHERE status = 'new'", (error, results) => {
//        if (error) {
//            throw error
//        }
//        response.status(200).json(results.rows)
//    })
//}
//
//const cancelChange = (request, response) => {
//    const id = parseInt(request.params.id)
//
//    pool.query("UPDATE changes SET status = 'cancel' WHERE id = $1", [id], (error, results) => {
//        if (error) {
//            throw error
//        }
//        response.status(200).send(`Member deleted with ID: ${id}`)
//    })
//}
//
//const acceptChange = (request, response) => {
//    const id = parseInt(request.params.id)
//
//    pool.query("UPDATE changes SET status = 'accepted' WHERE id = $1", [id], (error, results) => {
//        if (error) {
//            throw error
//        }
//        response.status(200).send(`Member deleted with ID: ${id}`)
//    })
//}

module.exports = {
  getHosts,
  newHost,
  updateHost,
  getOneHost,
  deleteHost,
  generateInventory,
};
