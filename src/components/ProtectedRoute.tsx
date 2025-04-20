"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function ProtectedRoute({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { data: session, status } = useSession();
  const { checkAccessStatus } = useAuth();
  const [accessStatus, setAccessStatus] = useState<'unknown'|'pending'|'approved'|'denied'>('unknown');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAccess = async () => {
      if (status === 'loading') return;
      
      if (!session) {
        redirect('/auth/login');
        return;
      }
      
      try {
        const status = await checkAccessStatus(session.user?.email || '');
        setAccessStatus(status);
        
        if (status !== 'approved') {
          redirect('/auth/login');
        }
      } catch (error) {
        console.error('Error checking access:', error);
        redirect('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAccess();
  }, [session, status]);
  
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }
  
  return accessStatus === 'approved' ? children : null;
}