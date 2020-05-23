import pool from "../../database";

class UserCheck {

    async checkUser(id: String): Promise<boolean> {
        let user = await pool.then((r: any) => r.query('SELECT id from usuarios where id=?', [id]));
        if (user.length > 0)
            return true;
        else
            return false;
    }
}
const userCheck = new UserCheck();
export default userCheck;