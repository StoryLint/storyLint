from enum import Enum

class Pattern(str, Enum):
    LoadingState = "LoadingState"
    ScopedAssociation = "ScopedAssociation"
    PermissionGate = "PermissionGate"
    MultiBehavior = "MultiBehavior"

class IssueCode(str, Enum):
    MISSING_ACTOR = "MISSING_ACTOR"
    MISSING_TRIGGER = "MISSING_TRIGGER"
    MISSING_END_CONDITION = "MISSING_END_CONDITION"
    MULTIPLE_BEHAVIORS = "MULTIPLE_BEHAVIORS"
    BANNED_PHRASE_ABILITY_TO = "BANNED_PHRASE_ABILITY_TO"
