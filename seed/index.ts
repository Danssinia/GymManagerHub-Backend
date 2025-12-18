import { AppDataSource } from "../config/data-source";
import { adminProfile } from "./admin.seed";
import { seedRoles } from "./role.seed";

async function runSeeds() {
    try {
        await AppDataSource.initialize();
        console.log('Database Connected')

        await seedRoles()
        await adminProfile()
        console.log('Seeding Completed')
        process.exit(0)
    } catch (error) {
        console.error('Seeding Failed', error)
        process.exit(1)
    }
}

runSeeds()