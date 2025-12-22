import { AppDataSource } from "../config/data-source"
import { Role } from "../entities/Role.entity"

export async function seedRoles() {
    const roleRepo = AppDataSource.getRepository(Role)

    const roles = [
        { role_name: 'Admin' },
        { role_name: 'Trainer' },
        { role_name: 'Receptionist' },
        { role_name: 'Member' }
    ]

    for (const role of roles) {
        const existingRole = await roleRepo.findOne({
            where: { role_name: role.role_name }
        })

        if (!existingRole) {
            const newRole = await roleRepo.create(role)
            const createdRole = await roleRepo.save(newRole)
            console.log('Role Seeded', createdRole)
        } else {
            console.log('Role exists')
        }
    }
}