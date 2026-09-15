CREATE TABLE Users (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  UserName TEXT NOT NULL,
  FullName TEXT,
  EmailID TEXT
);

CREATE TABLE SchemeMaster (
  SchemeID INTEGER PRIMARY KEY AUTOINCREMENT,
  SchemeName TEXT,
  CreatedBy INTEGER,
  CreatedDate TEXT
);

CREATE TABLE PlanMaster (
  PlanID INTEGER PRIMARY KEY AUTOINCREMENT,
  PlanName TEXT,
  PlanAmount REAL,
  SchemeID INTEGER,
  FOREIGN KEY (SchemeID) REFERENCES SchemeMaster(SchemeID)
);

CREATE TABLE MemberRegistration (
  MemID INTEGER PRIMARY KEY AUTOINCREMENT,
  MemberNo TEXT,
  MemberFName TEXT,
  MemberLName TEXT,
  DOB TEXT,
  ContactNo TEXT,
  EmailID TEXT,
  Gender TEXT,
  PlanTypeID INTEGER,
  WorkoutTypeID INTEGER,
  JoiningDate TEXT,
  Address TEXT
);

CREATE TABLE PaymentDetails (
  PaymentID INTEGER PRIMARY KEY AUTOINCREMENT,
  MemberID INTEGER,
  PlanID INTEGER,
  PaymentAmount REAL,
  PaymentFromDate TEXT,
  PaymentToDate TEXT,
  NextRenewalDate TEXT,
  FOREIGN KEY (MemberID) REFERENCES MemberRegistration(MemID)
);
