//
//  DetailViewController.h
//  GetWell
//
//  Created by Bryan Klimt on 9/15/12.
//  Copyright (c) 2012 HackForGood. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Parse/Parse.h>

@interface DetailViewController : UITableViewController

@property (nonatomic, retain) IBOutlet UILabel *name;
@property (nonatomic, retain) IBOutlet UILabel *status;
@property (nonatomic, retain) IBOutlet UILabel *batteryLevel;

@property (nonatomic, retain) PFObject *fridge;

@end
