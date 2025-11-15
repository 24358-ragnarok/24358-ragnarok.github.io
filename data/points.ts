/**
 * Points System Data
 *
 * Stores arbitrary point types for team members.
 * Format: { name: { pointType: value, ... } }
 */

export interface PointsData {
    [name: string]: {
        [pointType: string]: number;
    };
}

export const points: PointsData = {
    Agney: {
        food: 1,
        regular: -4999999999 * 2,
    },
    Ashley: {
        regular: 1,
    },
    Ben: {
        regular: 5,
    },
    Daouda: {
        regular: 5,
    },
    Jacob: {
        leadership: 1,
        regular: 3,
        sigma: 2,
    },
    Noel: {
        regular: 2,
    },
    Rishu: {
        leadership: 1,
        regular: 10000,
    },
    Conner: {
        screw: -3,
    },
    Deepak: {
        code: -62,
    },
    Grant: {
        existing: 1_000_000_000,
    },
};

/**
 * Get all unique point types across all members
 */
export function getAllPointTypes(): string[] {
    const types = new Set<string>();
    Object.values(points).forEach((memberPoints) => {
        Object.keys(memberPoints).forEach((type) => types.add(type));
    });
    return Array.from(types).sort();
}

/**
 * Get combined score for a member (sum of all point types)
 */
export function getCombinedScore(name: string): number {
    const memberPoints = points[name];
    if (!memberPoints) return 0;
    return Object.values(memberPoints).reduce((sum, value) => sum + value, 0);
}

/**
 * Get score for a specific point type
 */
export function getScoreForType(name: string, pointType: string): number {
    const memberPoints = points[name];
    if (!memberPoints) return 0;
    return memberPoints[pointType] || 0;
}
