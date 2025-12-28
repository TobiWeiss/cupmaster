import { StorageInterface } from "../../common/services/storage/StorageInterface";
import { Group } from "../types/game-plan/Group";

export class GroupService {
  constructor(private storage: StorageInterface) {}

  async getGroups(tournamentId: string): Promise<Group[]> {
    const data = await this.storage.getGroups(tournamentId);
    return data.map((group: Record<string, any>) => Group.fromObject(group));
  }

  async createGroups(groups: Group[]): Promise<void> {
    await this.storage.createGroups(groups);
  }

  async updateGroups(groups: Group[]): Promise<void> {
    await this.storage.updateGroups(groups);
  }
}