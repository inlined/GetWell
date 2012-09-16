//
//  DetailViewController.m
//  GetWell
//
//  Created by Bryan Klimt on 9/15/12.
//  Copyright (c) 2012 HackForGood. All rights reserved.
//

#import "DetailViewController.h"

@interface DetailViewController ()

@end

@implementation DetailViewController

- (id)initWithStyle:(UITableViewStyle)style
{
    self = [super initWithStyle:style];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];

    // Uncomment the following line to preserve selection between presentations.
    // self.clearsSelectionOnViewWillAppear = NO;
 
    // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
    // self.navigationItem.rightBarButtonItem = self.editButtonItem;
    
    //[self.fridge fetchInBackgroundWithBlock:^(PFObject *object, NSError *error) {
    PFObject *object = self.fridge;
        [self.name setText:[object objectForKey:@"name"]];
        [self.batteryLevel setText:[NSString stringWithFormat:@"%@%%", [object objectForKey:@"battery"]]];
        if ([[NSDate date] timeIntervalSinceDate:object.updatedAt] > (60 * 4)) {
            [self.status setText:@"Offline"];
        } else if ([[object objectForKey:@"usingBattery"] boolValue]) {
            [self.status setText:@"Battery"];
        } else if ([[object objectForKey:@"battery"] intValue] < 100) {
            [self.status setText:@"Charging"];
        } else {
            [self.status setText:@"Online"];
        }
    //}];
    
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

@end
