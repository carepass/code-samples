/*
 * Copyright 2012 Aetna, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0.html
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

#import "ViewController.h"

@implementation ViewController

@synthesize lblPrice;
@synthesize txtDrugName;
@synthesize wvResults;

@synthesize drugName = _drugName;

@synthesize exception;
@synthesize response;
@synthesize error;

- (id)init {
    self = [super init];
    if (self) {
        response  = nil;
        exception = nil;
        error     = nil;

    }
    return self;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

- (void)viewDidLoad {
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)viewDidUnload {
    [self setDrugName:nil];
    [self setTxtDrugName:nil];
    [self setLblPrice:nil];
    [self setWvResults:nil];
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated {
	[super viewWillDisappear:animated];
}

- (void)viewDidDisappear:(BOOL)animated {
	[super viewDidDisappear:animated];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    // Return YES for supported orientations
    return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
}

- (IBAction)doSearch:(id)sender {
    self.drugName = self.txtDrugName.text;
    
    NSString *nameString = self.drugName;
    if ([nameString length] != 0) {
        // Get the object from the bucket.
        RRXSearchRequest *searchRequest = [[RRXSearchRequest alloc] init];
        searchRequest.name = self.txtDrugName.text;
        [searchRequest setDelegate:self];
        
        // When using delegates the return is nil.
        [[CarePassClientManager client] lowSearch:searchRequest];
    }
}

- (BOOL)textFieldShouldReturn:(UITextField *)theTextField {
    if (theTextField == self.txtDrugName) {
        [theTextField resignFirstResponder];
    }
    return YES;
}

-(bool)isFinishedOrFailed {
    return (response != nil || error != nil || exception != nil);
}

-(void)request:(CarePassServiceRequest *)request didReceiveResponse:(NSURLResponse *)aResponse {
    NSLog(@"didReceiveResponse");
}

-(void)request:(CarePassServiceRequest *)request didCompleteWithResponse:(CarePassServiceResponse *)aResponse {
    NSLog(@"didCompleteWithResponse : %@", aResponse);
    response = aResponse;
    RRXSearchResult *result = [(RRXSearchResponse *) aResponse searchResult];
    if ([result.price count] > 0) {
        lblPrice.text = [result.price objectAtIndex:0];

        NSURL *url = [NSURL URLWithString:result.mobileUrl];
        NSURLRequest *webRequest = [NSURLRequest requestWithURL:url];
        [wvResults loadRequest:webRequest];
    } else {
        lblPrice.text = @"No results found.";
    }
}

-(void)request:(CarePassServiceRequest *)request didReceiveData:(NSData *)data {
    NSLog(@"didReceiveData");
}

-(void)request:(CarePassServiceRequest *)request didSendData:(NSInteger)bytesWritten totalBytesWritten:(NSInteger)totalBytesWritten totalBytesExpectedToWrite:(NSInteger)totalBytesExpectedToWrite {
    NSLog(@"didSendData");
}

-(void)request:(CarePassServiceRequest *)request didFailWithError:(NSError *)theError {
    NSLog(@"didFailWithError : %@", theError);
    error = theError;
}

-(void)request:(CarePassServiceRequest *)request didFailWithServiceException:(NSException *)theException {
    NSLog(@"didFailWithServiceException : %@", theException);
    exception = theException;
}

@end