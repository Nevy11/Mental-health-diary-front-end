export interface AddForm {
  username: string;
  goal_name: string;
}
export interface clearGoal {
  username: string;
}

export interface GoalsReturned {
  id: number;
  username: string;
  goal_name: string;
}

export interface GoalsDone {
  username: string;
  goal_name: string;
}

export interface UpdateGoal {
  username: string;
  old_value: string;
  new_value: string;
}

export interface ReturnData {
  success: boolean;
  data: string[];
}

export interface CheckIfGoalExists {
  exists: boolean;
  message: string;
  success: boolean;
}
